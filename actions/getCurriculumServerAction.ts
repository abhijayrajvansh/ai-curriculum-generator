"use server";

import { db } from "@/db/drizzle";
import { curriculums } from "@/db/schema";
import { eq } from "drizzle-orm";

export type CurriculumIdType = {
  curriculumid: string[];
};

export async function fetchCurriculumData(params: CurriculumIdType) {
  const id = params.curriculumid[0];

  const result = await db
    .select({ 
      curriculumName: curriculums.curriculumName,
      curriculumData: curriculums.curriculumData
    })
    .from(curriculums)
    .where(eq(curriculums.id, id));

  return result;
}
