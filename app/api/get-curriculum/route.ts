import { db } from "@/db/drizzle";
import { curriculums } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userEmail } = await req.json();

  const userCurriculums = await db
    .select()
    .from(curriculums)
    .where(eq(curriculums.email, userEmail));

  return Response.json({
    userCurriculums,
  });
}
