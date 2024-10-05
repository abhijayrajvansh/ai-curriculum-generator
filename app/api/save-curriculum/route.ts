import { db } from '@/db/drizzle';
import { curriculums } from '@/db/schema'

export async function POST(req: Request) {
  const { curriculumData } = await req.json();
  try {
    await db.insert(curriculums).values({
      curriculumName: curriculumData.curriculumName,
      curriculumData: curriculumData.curriculumContent,
      email: curriculumData.userEmail
    })
  } catch (error) {
    console.log(error)
  }

  return Response.json({
    msg: true
  })
}
