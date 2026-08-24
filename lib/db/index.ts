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

// In-Memory Store for instant zero-config rendering & mutations
class LocalDataStore {
  departments: DepartmentData[] = [...INITIAL_DEPARTMENTS];
  teamMembers: TeamMemberData[] = [...INITIAL_TEAM_MEMBERS];
  events: EventData[] = [...INITIAL_EVENTS];
  projects: ProjectData[] = [...INITIAL_PROJECTS];
  gallery: GalleryImageData[] = [...INITIAL_GALLERY];
  modules: AWSModuleData[] = [...INITIAL_AWS_MODULES];
  messages: ContactMessageData[] = [...INITIAL_CONTACT_MESSAGES];
  registrations: { id: string; eventId: string; name: string; email: string; college: string; registeredAt: string }[] = [];

  // Events
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

  registerForEvent(eventId: string, data: { name: string; email: string; college?: string }) {
    const event = this.events.find((e) => e.id === eventId || e.slug === eventId);
    if (!event) throw new Error("Event not found");

    const existing = this.registrations.find((r) => r.eventId === event.id && r.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error("You have already registered for this event with this email.");
    }

    const reg = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      name: data.name,
      email: data.email,
      college: data.college || "St. Xavier's College",
      registeredAt: new Date().toISOString(),
    };
    this.registrations.push(reg);
    event.currentRegistrations += 1;
    return reg;
  }

  // Projects
  getProjects() {
    return this.projects;
  }

  getProjectBySlug(slug: string) {
    return this.projects.find((p) => p.slug === slug || p.id === slug) || null;
  }

  addProject(project: Omit<ProjectData, "id">) {
    const newProject: ProjectData = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    this.projects.unshift(newProject);
    return newProject;
  }

  deleteProject(id: string) {
    const prevLen = this.projects.length;
    this.projects = this.projects.filter((p) => p.id !== id);
    return this.projects.length < prevLen;
  }

  // Team
  getDepartments() {
    return this.departments;
  }

  getTeamMembers() {
    return this.teamMembers;
  }

  addTeamMember(member: Omit<TeamMemberData, "id">) {
    const newMember: TeamMemberData = {
      ...member,
      id: `member-${Date.now()}`,
    };
    this.teamMembers.push(newMember);
    return newMember;
  }

  deleteTeamMember(id: string) {
    const prevLen = this.teamMembers.length;
    this.teamMembers = this.teamMembers.filter((m) => m.id !== id);
    return this.teamMembers.length < prevLen;
  }

  // Gallery
  getGallery() {
    return this.gallery;
  }

  addGalleryImage(img: Omit<GalleryImageData, "id">) {
    const newImg: GalleryImageData = {
      ...img,
      id: `gal-${Date.now()}`,
    };
    this.gallery.unshift(newImg);
    return newImg;
  }

  deleteGalleryImage(id: string) {
    const prevLen = this.gallery.length;
    this.gallery = this.gallery.filter((g) => g.id !== id);
    return this.gallery.length < prevLen;
  }

  // AWS Modules
  getModules() {
    return this.modules;
  }

  getModuleBySlug(slug: string) {
    return this.modules.find((m) => m.slug === slug || m.serviceCode.toLowerCase() === slug.toLowerCase()) || null;
  }

  addModule(module: Omit<AWSModuleData, "id">) {
    const newMod: AWSModuleData = {
      ...module,
      id: `mod-${Date.now()}`,
    };
    this.modules.push(newMod);
    return newMod;
  }

  deleteModule(id: string) {
    const prevLen = this.modules.length;
    this.modules = this.modules.filter((m) => m.id !== id);
    return this.modules.length < prevLen;
  }

  // Messages
  getMessages() {
    return this.messages;
  }

  addMessage(msg: { name: string; email: string; subject: string; message: string }) {
    const newMsg: ContactMessageData = {
      ...msg,
      id: `msg-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    this.messages.unshift(newMsg);
    return newMsg;
  }

  markMessageRead(id: string) {
    const msg = this.messages.find((m) => m.id === id);
    if (msg) {
      msg.isRead = true;
      return msg;
    }
    return null;
  }

  deleteMessage(id: string) {
    const prevLen = this.messages.length;
    this.messages = this.messages.filter((m) => m.id !== id);
    return this.messages.length < prevLen;
  }
}

// Global Singleton Store
const globalForStore = globalThis as unknown as { localStore?: LocalDataStore };
export const db = globalForStore.localStore ?? new LocalDataStore();
if (process.env.NODE_ENV !== "production") globalForStore.localStore = db;
