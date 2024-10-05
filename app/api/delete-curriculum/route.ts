import { db } from "@/db/drizzle";
import { curriculums } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { curriculumId } = await req.json();

  await db.delete(curriculums).where(eq(curriculums.id, curriculumId));

  return Response.json({
    msg: true
  });
}
