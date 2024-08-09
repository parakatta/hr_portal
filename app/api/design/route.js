import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { hrProfileId } = req.query;

  if (!hrProfileId) {
    return res.status(400).json({ error: "hrProfileId is required" });
  }

  const designs = await prisma.design.findMany({
    where: { hrProfileId },
  });

  res.status(200).json(designs);
}

export async function POST(req, res) {
  const {
    id,
    hrProfileId,
    buttonColor,
    buttonHover,
    logoDark,
    faviconLogo,
    businessLogo,
  } = req.body;

  if (!hrProfileId) {
    return res.status(400).json({ error: "hrProfileId is required" });
  }

  const updatedDesign = await prisma.design.upsert({
    where: { id },
    update: {
      buttonColor,
      buttonHover,
      logoDark,
      faviconLogo,
      businessLogo,
      updatedAt: new Date(),
    },
    create: {
      id,
      hrProfileId,
      buttonColor,
      buttonHover,
      logoDark,
      faviconLogo,
      businessLogo,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  res.status(200).json(updatedDesign);
}
