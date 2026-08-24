import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventId, name, firstName, surname, uid, email, academicYear, stream } = body;

    const registrantName = name || `${firstName || ""} ${surname || ""}`.trim();

    if (!eventId || !registrantName || !email) {
      return NextResponse.json(
        { error: "Event ID, Name, and Email are required." },
        { status: 400 }
      );
    }

    const reg = await db.registerForEvent(eventId, {
      name: registrantName,
      surname,
      uid,
      email,
      academicYear,
      stream,
      college: "St. Xavier's College",
    });

    return NextResponse.json(
      { success: true, message: "Registration confirmed successfully!", data: reg },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to register for event." },
      { status: 400 }
    );
  }
}
