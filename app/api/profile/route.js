import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyToken } from "@/utils/jwt";
export async function POST(request) {
  try {
    const token = request.headers.get("authorization").split(" ")[1];
    console.log("token is", token);
    if (!token) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    const { companyName, companyLogo, websiteUrl } = await request.json();
    const profile = await prisma.hRProfile.create({
      data: {
        userId: decoded.id,
        companyName: companyName,
        companyLogo: companyLogo,
        websiteUrl: websiteUrl,
      },
    });

    await prisma.user.update({
      where: { id: decoded.id },
      data: { isProfileSetup: true },
    });

    return NextResponse.json(
      { message: "Profile setup successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error setting up profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
