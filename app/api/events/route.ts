import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function GET() {
  const events = db.getEvents();
  return NextResponse.json({ success: true, data: events });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, date, time, venue, category, maxSeats, imageUrl } = body;

    if (!title || !description || !venue) {
      return NextResponse.json({ error: "Title, description, and venue are required." }, { status: 400 });
    }

    const newEvent = db.addEvent({
      title,
      slug: slugify(title),
      description,
      fullDetails: description,
      date: date || new Date().toISOString(),
      time: time || "02:00 PM - 05:00 PM IST",
      venue,
      category: category || "WORKSHOP",
      status: "UPCOMING",
      isFeatured: false,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
      bannerUrl: imageUrl || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
      speakerNames: ["SXC AWS Tech Team"],
      prerequisites: ["Laptop with web browser"],
      agenda: [{ time: "02:00 PM", title: "Keynote & Lab", description: "Hands-on cloud session." }],
      maxSeats: Number(maxSeats) || 100,
    });

    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const deleted = db.deleteEvent(id);
    return NextResponse.json({ success: deleted });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
