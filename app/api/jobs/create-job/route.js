// app/api/jobs/create-job/route.js
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(request) {
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

    const data = await request.json();
    const {
      title,
      websiteUrl,
      location,
      salary,
      type,
      description,
      responsibilities,
      requirements,
    } = data;

    const hrProfile = await prisma.hRProfile.findUnique({
      where: { userId: userId },
    });

    if (!hrProfile) {
      return NextResponse.json(
        { message: "HR Profile not found" },
        { status: 404 }
      );
    }

    await prisma.job.create({
      data: {
        title,
        websiteUrl,
        location,
        salary,
        type,
        description,
        responsibilities,
        requirements,
        hrProfileId: hrProfile.id,
      },
    });

    return NextResponse.json(
      { message: "Job created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
