import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request) {
  try {
    const { idd, data } = await request.json();

    const updatedJob = await prisma.job.update({
      where: { id: idd },
      data,
    });

    return NextResponse.json(updatedJob, { status: 200 });
  } catch (error) {
    console.error("Failed to update job", error);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}
