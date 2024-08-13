const password = process.env.PASSWORD;
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const confirmationToken = crypto.randomBytes(32).toString("hex");
  const confirmationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Create the user
  /* const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      confirmationToken,
      confirmationTokenExpires: confirmationTokenExpiry,
    },
  }); */

  // Send confirmation email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,
    },
  });

  const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/confirm-email?token=${confirmationToken}`;

  const mailData = {
    from: process.env.EMAIL_ID,
    to: "aleemaparakatta@gmail.com",
    subject: `Confirm Your Email Address`,
    text: `Please confirm your email address by clicking the link: ${confirmationUrl}`,
    priority: "high",
    html: `
      <h3>Confirm Your Email Address</h3>
      <h4>Please confirm your email address by clicking the link: ${confirmationUrl}</h4>
      <p>Best Regards,</p>
      <p>HR Portal</p>
    `,
  };
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: "aleemaparakatta@gmail.com",
      subject: `Confirm Your Email Address`,
      text: `Please confirm your email address by clicking the link: ${confirmationUrl}`,
      priority: "high",
      html: `
      <h3>Confirm Your Email Address</h3>
      <h4>Please confirm your email address by clicking the link: ${confirmationUrl}</h4>
      <p>Best Regards,</p>
      <p>HR Portal</p>
    `,
    });
    console.log("Message sent: %s", info.messageId);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        confirmationToken,
        confirmationTokenExpires: confirmationTokenExpiry,
      },
    });
    return NextResponse.json({
      message: "Confirmation email sent, user created",
    });
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    return NextResponse.json({ message: "Failed to send email" });
  }
}
