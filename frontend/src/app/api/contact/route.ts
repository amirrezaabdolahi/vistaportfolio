import { Resend } from "resend";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(160).default(""),
  website: z.string().trim().max(2048).default(""),
  services: z.array(z.string().max(50)).max(10).default([]),
  otherService: z.string().trim().max(200).default(""),
  projectDescription: z.string().trim().min(1).max(5000),
  stage: z.string().max(50).default(""),
  support: z.array(z.string().max(50)).max(10).default([]),
  budget: z.string().max(50).default(""),
  timeline: z.string().max(50).default(""),
  additionalContext: z.string().trim().max(5000).default(""),
});

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the submitted fields." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `New project inquiry from ${data.name}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Website: ${data.website}`,
        `Services: ${data.services.join(", ")}`,
        `Other service: ${data.otherService}`,
        `Project description: ${data.projectDescription}`,
        `Stage: ${data.stage}`,
        `Support: ${data.support.join(", ")}`,
        `Budget: ${data.budget}`,
        `Timeline: ${data.timeline}`,
        `Additional context: ${data.additionalContext}`,
      ].join("\n\n"),
    });

    if (error) {
      console.error("Resend delivery error:", error);
      return NextResponse.json(
        { error: "Email could not be sent." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Email service temporarily unavailable." },
      { status: 502 },
    );
  }
}
