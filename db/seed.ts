import { db } from '@/db/drizzle'
import { curriculums } from './schema'

async function addData() {
  await db.insert(curriculums).values([
    {
      curriculumName: 'another roadmap',
      curriculumData: 'roadmap to 100k remote job offer',
      email: 'r.abhijay@uptut.com'
    },
    {
      curriculumName: 'sample curriculum',
      curriculumData: 'lets go to sf',
      email: 'r.abhijay@uptut.com'
    },
  ])

  console.log('🌱 database seeded successfully!')
}

async function getData() {
  const allCurriculums = await db.select().from(curriculums);
  console.log(allCurriculums);
}

addData()