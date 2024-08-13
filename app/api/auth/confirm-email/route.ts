import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { token } = await request.json();

  const user = await prisma.user.findFirst({
    where: {
      confirmationToken: token,
      confirmationTokenExpires: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isEmailConfirmed: true,
      confirmationToken: null,
      confirmationTokenExpires: null,
    },
  });

  return NextResponse.json({ message: "Email confirmed successfully" });
}
