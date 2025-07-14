import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    subscriptionId: varchar("subscriptionId").notNull()
});

export const coursesTable = pgTable("courses", {
    id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
    cid: varchar("cid", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }),
    description: varchar("description", { length: 255 }),
    noOfChapters: integer("noOfChapters").notNull(),
    includeVideo: boolean("includeVideo").default(false),
    level: varchar("level", { length: 255 }).notNull(),
    catetgory: varchar("catetgory", { length: 255 }),
    courseJson: json("courseJson"),
    userEmail: varchar("userEmail", { length: 255 }).references(() => usersTable.email).notNull()
});