import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request) {
  try {
    const data = await request.formData();
    const jobId = data.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    await prisma.job.delete({
      where: {
        id: jobId,
      },
    });
    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
