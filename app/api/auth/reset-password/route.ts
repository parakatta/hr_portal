import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, code, newPassword } = await request.json();
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (
    user?.passwordResetCode != code
    /* (user.passwordResetExpires
      ? user.passwordResetExpires < new Date()
      : "null") */
  ) {
    return NextResponse.json(
      { error: "Invalid or expired reset code" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      passwordResetCode: null,
      passwordResetToken: null,
      passwordResetExpires: null,
    },
  });

  return NextResponse.json({ message: "Password updated successfully" });
}
