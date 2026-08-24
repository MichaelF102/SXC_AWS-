import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const saved = await db.addMessage({
      name,
      email,
      subject: subject || "General Inquiry",
      message,
    });

    return NextResponse.json(
      { success: true, message: "Your message has been received.", data: saved },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process message." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = db.getMessages();
    return NextResponse.json({ success: true, data: messages });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
