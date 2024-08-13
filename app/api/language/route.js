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
    const lang = await prisma.language.findMany({
      where: { hrProfileId: hrProfileId },
    });
    return NextResponse.json(
      {
        id: lang[0].id,
        language: lang[0].language,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching lang:", error);
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
    const { languageId, language } = data;

    const hrProfile = await prisma.hRProfile.findUnique({
      where: { userId: userId },
    });

    if (!hrProfile) {
      return new Response(JSON.stringify({ error: "HRProfile not found" }), {
        status: 404,
      });
    }

    const hrProfileId = hrProfile.id;

    const updatedLang = await prisma.language.update({
      where: { id: languageId },
      data: {
        language: language,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedLang, { status: 200 });
  } catch (error) {
    console.error("Error updating language:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
