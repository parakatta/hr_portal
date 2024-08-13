import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const id = request.url.split("/jobs/")[1];

  try {
    const job = await prisma.job.findUnique({
      where: { id },
    });
    if (job) {
      return new Response(JSON.stringify(job), { status: 200 });
    } else {
      return new Response("Job not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Error fetching job details", { status: 500 });
  }
}
