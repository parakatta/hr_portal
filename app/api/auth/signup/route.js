import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const { name, email, password, hrProfileId } = await request.json();
  if (!name || !email || !password) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const users = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      hr_profile_id: hrProfileId,
    },
  });

  return new Response(JSON.stringify(users), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
