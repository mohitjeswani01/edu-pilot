import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    const user = await currentUser();

    console.log("User:", user);

    if (courseId == 0) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(sql`${coursesTable.courseContent} ::jsonb != '{}'::jsonb`);

        console.log(result)

        return NextResponse.json(result[0] || {});
    }

    if (courseId) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json(result[0] || {});
    } else {
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!email) {
            return NextResponse.json({ error: "User email not found" }, { status: 400 });
        }

        const result = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.userEmail, email.toLowerCase()))
            .orderBy(desc(coursesTable.id))

        return NextResponse.json(result);
    }
}
