import 'dotenv/config';
import { timestamp, pgTable, text, primaryKey, integer, pgEnum } from "drizzle-orm/pg-core"

export const curriculums = pgTable("curriculums", {
  id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
  curriculumName: text("curriculum_name").notNull(),
  curriculumData: text("curriculum_data").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow()
})

