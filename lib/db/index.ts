import {
  INITIAL_DEPARTMENTS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_GALLERY,
  INITIAL_AWS_MODULES,
  INITIAL_CONTACT_MESSAGES,
  DepartmentData,
  TeamMemberData,
  EventData,
  ProjectData,
  GalleryImageData,
  AWSModuleData,
  ContactMessageData,
} from "@/lib/data/initialData";
import { supabase, getServiceSupabase, isSupabaseConfigured } from "@/lib/supabase";

// Local Store for instant SSG / Static Generation and offline fallback
class LocalDataStore {
  departments: DepartmentData[] = [...INITIAL_DEPARTMENTS];
  teamMembers: TeamMemberData[] = [...INITIAL_TEAM_MEMBERS];
  events: EventData[] = [...INITIAL_EVENTS];
  projects: ProjectData[] = [...INITIAL_PROJECTS];
  gallery: GalleryImageData[] = [...INITIAL_GALLERY];
  modules: AWSModuleData[] = [...INITIAL_AWS_MODULES];
  messages: ContactMessageData[] = [...INITIAL_CONTACT_MESSAGES];
  registrations: {
    id: string;
    eventId: string;
    name: string;
    surname?: string;
    uid?: string;
    email: string;
    academicYear?: string;
    stream?: string;
    college: string;
    registeredAt: string;
  }[] = [];

  // ==================== Events ====================
  getEvents() {
    return this.events;
  }

  getEventBySlug(slug: string) {
    return this.events.find((e) => e.slug === slug || e.id === slug) || null;
  }

  addEvent(event: Omit<EventData, "id" | "currentRegistrations">) {
    const newEvent: EventData = {
      ...event,
      id: `event-${Date.now()}`,
      currentRegistrations: 0,
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<EventData>) {
    const idx = this.events.findIndex((e) => e.id === id);
    if (idx !== -1) {
      this.events[idx] = { ...this.events[idx], ...updates };
      return this.events[idx];
    }
    return null;
  }

  deleteEvent(id: string) {
    const prevLen = this.events.length;
    this.events = this.events.filter((e) => e.id !== id);
    return this.events.length < prevLen;
  }

  // ==================== Event Registrations ====================
  async registerForEvent(
    eventId: string,
    data: {
      name: string;
      surname?: string;
      uid?: string;
      email: string;
      academicYear?: string;
      stream?: string;
      college?: string;
    }
  ) {
    const event = this.events.find((e) => e.id === eventId || e.slug === eventId);
    if (!event) throw new Error("Event not found");

    // Check duplicate in local store
    const existing = this.registrations.find(
      (r) => r.eventId === event.id && r.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) {
      throw new Error("You have already registered for this event with this email.");
    }

    // If Supabase is connected, persist to Supabase PostgreSQL table
    if (isSupabaseConfigured) {
      const client = getServiceSupabase() || supabase;
      if (client) {
        const { data: inserted, error } = await client
          .from("registrations")
          .insert({
            event_id: event.id,
            name: data.name,
            surname: data.surname || "",
            uid: data.uid || "",
            email: data.email,
            academic_year: data.academicYear || "",
            stream: data.stream || "",
            college: data.college || "St. Xavier's College",
          })
          .select()
          .single();

        if (error) {
          console.warn("[Supabase] Registration fallback to local:", error.message);
        } else {
          // Increment in Supabase
          try {
            await client.rpc("increment_event_registrations", { event_id: event.id });
          } catch (e) {}
        }
      }
    }

    const reg = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      name: data.name,
      surname: data.surname,
      uid: data.uid,
      email: data.email,
      academicYear: data.academicYear,
      stream: data.stream,
      college: data.college || "St. Xavier's College",
      registeredAt: new Date().toISOString(),
    };
    this.registrations.push(reg);
    event.currentRegistrations += 1;
    return reg;
  }

  // ==================== Contact Messages ====================
  async addMessage(msg: Omit<ContactMessageData, "id" | "createdAt" | "isRead">) {
    // If Supabase is connected, persist to Supabase table
    if (isSupabaseConfigured) {
      const client = getServiceSupabase() || supabase;
      if (client) {
        const { error } = await client.from("contact_messages").insert({
          name: msg.name,
          email: msg.email,
          subject: msg.subject,
          category: msg.category || "GENERAL",
          message: msg.message,
        });
        if (error) {
          console.warn("[Supabase] Contact message fallback to local:", error.message);
        }
      }
    }

    const newMsg: ContactMessageData = {
      ...msg,
      id: `msg-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.messages.unshift(newMsg);
    return newMsg;
  }

  getMessages() {
    return this.messages;
  }

  // ==================== Other Stores ====================
  getProjects() {
    return this.projects;
  }

  getDepartments() {
    return this.departments;
  }

  getTeamMembers() {
    return this.teamMembers;
  }

  getGallery() {
    return this.gallery;
  }

  getAWSModules() {
    return this.modules;
  }

  getModules() {
    return this.modules;
  }

  getModuleBySlug(slug: string) {
    return this.modules.find((m) => m.slug === slug || m.id === slug) || null;
  }
}

export const db = new LocalDataStore();
