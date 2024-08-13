import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

const password = process.env.PASSWORD;
export async function POST(request: Request) {
  const { email } = await request.json();

  // Generate a 6-digit code
  const resetCode = crypto.randomInt(100000, 999999).toString();
  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

  const hashedResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await prisma.user.update({
    where: { email },
    data: {
      passwordResetCode: resetCode,
      passwordResetToken: hashedResetToken,
      passwordResetExpires: resetTokenExpiry,
    },
  });

  // Send reset code via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,
    },
  });

  const mailData = {
    from: process.env.EMAIL_ID,
    to: "aleemaparakatta@gmail.com",
    subject: `Password Reset Code`,
    text: `Your password reset code is ${resetCode}. It will expire in 10 minutes.`,
    priority: "high",
    html: `
      <h3>Password reset code</h3>
      <h4>Your password reset code is ${resetCode}. It will expire in 10 minutes.</h4>
      <p>Best Regards,</p>
      <p>HR Portal</p>
    `,
  };
  try {
    let info = await transporter.sendMail({
      from: process.env.EMAIL_ID,
      to: "aleemaparakatta@gmail.com",
      subject: `Password Reset Code`,
      text: `Your password reset code is ${resetCode}. It will expire in 10 minutes.`,
      priority: "high",
      html: `
      <h3>Password reset code</h3>
      <h4>Your password reset code is ${resetCode}. It will expire in 10 minutes.</h4>
      <p>Best Regards,</p>
      <p>HR Portal</p>
    `,
    });
    console.log("Message sent: %s", info.messageId);
    return NextResponse.json({ message: "Reset code sent" });
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    return NextResponse.json({ message: "Error sending mail" });
  }
}
