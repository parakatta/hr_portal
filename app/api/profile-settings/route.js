import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import Busboy from "busboy";

const SECRET_KEY = process.env.JWT_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function GET(req) {
  try {
    const token = req.headers.get("authorization").split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const hrProfile = await prisma.hRProfile.findUnique({
      where: { userId: userId },
    });

    if (!hrProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: hrProfile.id,
      fullName: user.name,
      email: user.email,
      companyName: hrProfile.companyName,
      companyLogo: hrProfile.companyLogo,
      websiteUrl: hrProfile.websiteUrl,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { message: "Error fetching profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { message: "Authentication token missing" },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const userId = decodedToken.id;
    const formData = await req.formData();
    const fullName = formData.get("fullName");
    const companyName = formData.get("companyName");
    const websiteUrl = formData.get("websiteUrl");
    console.log(formData.get("companyLogo"));
    const companyLogo = formData.get("companyLogo")
      ? `/uploads/${formData.get("companyLogo").filename}`
      : null;
    console.log(fullName, companyLogo, companyName, websiteUrl);

    /* const form = new formidable.IncomingForm({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
    });

    const formParse = () =>
      new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

    const { fields, files } = await formParse(); 

    const companyLogo = files.companyLogo
      ? `/uploads/${files.companyLogo.newFilename}`
      : null;*/

    // Update the user
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: fullName,
      },
    });

    await prisma.hRProfile.update({
      where: { userId: userId },
      data: {
        companyName: companyName,
        companyLogo: companyLogo || undefined,
        websiteUrl: websiteUrl,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { message: "Error updating profile" },
      { status: 500 }
    );
  }
}
