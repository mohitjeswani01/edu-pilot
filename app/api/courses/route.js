import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";
import { desc } from "drizzle-orm";
import { coursesTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    // This block for a special case remains the same
    if (courseId == 0) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(sql`${coursesTable.courseContent} ::jsonb != '{}'::jsonb`);
        return NextResponse.json(result[0] || {});
    }

    // This block for fetching a single course by ID remains the same
    if (courseId) {
        const result = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.cid, courseId));
        return NextResponse.json(result[0] || {});
    }

    // ✅ CORRECTED: This block now fetches ALL courses for the Explore page
    else {
        const result = await db
            .select()
            .from(coursesTable)
            .orderBy(desc(coursesTable.id)); // Orders by newest first

        return NextResponse.json(result);
    }
}