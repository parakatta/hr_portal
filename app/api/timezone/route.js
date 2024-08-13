import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    const hrProfile = await prisma.hRProfile.findUnique({
      where: { userId: userId },
    });

    if (!hrProfile) {
      return new Response(JSON.stringify({ error: "HRProfile not found" }), {
        status: 404,
      });
    }

    const hrProfileId = hrProfile.id;
    console.log(hrProfileId);
    const timezo = await prisma.timezone.findMany({
      where: { hrProfileId: hrProfileId },
    });

    return NextResponse.json(
      {
        id: timezo[0].id,
        timezone: timezo[0].timezone,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching timezone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const token = request.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;
    const { timezoneId, timezone } = data;

    const hrProfile = await prisma.hRProfile.findUnique({
      where: { userId: userId },
    });

    if (!hrProfile) {
      return new Response(JSON.stringify({ error: "HRProfile not found" }), {
        status: 404,
      });
    }

    const hrProfileId = hrProfile.id;

    const updatedTitle = await prisma.timezone.update({
      where: { id: timezoneId },
      data: {
        timezone: timezone,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedTitle, { status: 200 });
  } catch (error) {
    console.error("Error updating timezone:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
