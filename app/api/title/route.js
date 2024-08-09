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
    const titles = await prisma.title.findMany({
      where: { hrProfileId: hrProfileId },
    });
    console.log(titles);

    return NextResponse.json(
      {
        id: titles[0].id,
        title: titles[0].title,
        description: titles[0].description,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching titles:", error);
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
    const { title, description } = data;

    const hrProfile = await prisma.hRProfile.findUnique({
      where: { userId: userId },
    });

    if (!hrProfile) {
      return new Response(JSON.stringify({ error: "HRProfile not found" }), {
        status: 404,
      });
    }

    const hrProfileId = hrProfile.id;

    const updatedTitle = await prisma.title.update({
      where: { hrProfileId: hrProfileId },
      data: {
        title: title,
        description: description,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedTitle, { status: 200 });
  } catch (error) {
    console.error("Error updating title:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
