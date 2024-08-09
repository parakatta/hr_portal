import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, res) {
  const { hrProfileId } = req.query;

  if (!hrProfileId) {
    return res.status(400).json({ error: "hrProfileId is required" });
  }

  const announcements = await prisma.announcement.findMany({
    where: { hrProfileId },
  });

  res.status(200).json(announcements);
}

export async function POST(req, res) {
  const { id, hrProfileId, announcement, bgColor, textColor } = req.body;

  if (!hrProfileId) {
    return res.status(400).json({ error: "hrProfileId is required" });
  }

  const updatedAnnouncement = await prisma.announcement.upsert({
    where: { id },
    update: {
      announcement,
      bgColor,
      textColor,
      updatedAt: new Date(),
    },
    create: {
      id,
      hrProfileId,
      announcement,
      bgColor,
      textColor,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  res.status(200).json(updatedAnnouncement);
}
