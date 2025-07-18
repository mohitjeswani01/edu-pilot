import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    subscriptionId: varchar("subscriptionId").notNull()
});

export const coursesTable = pgTable("courses", {
    id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
    cid: varchar("cid", { length: 255 }).notNull().unique(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 255 }),
    noOfChapters: integer("noOfChapters").notNull(),
    includeVideo: boolean("includeVideo").default(false),
    level: varchar("level", { length: 255 }).notNull(),
    catetgory: varchar("catetgory", { length: 255 }),
    courseJson: json("courseJson"),
    bannerImageUrl: varchar("bannerImageUrl", { length: 255 }).default(''),
    courseContent: json().default({}),
    userEmail: varchar("userEmail", { length: 255 }).references(() => usersTable.email).notNull()
});

export const enrollCourseTable = pgTable('enrollCourse', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    cid: varchar('cid', { length: 255 }).notNull().references(() => coursesTable.cid),
    userEmail: varchar('userEmail', { length: 255 }).notNull().references(() => usersTable.email),
    completedChapters: json('completedChapters')
    // Optionally:
    // enrolledAt: timestamp('enrolledAt').defaultNow(),
    // updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow()
});
