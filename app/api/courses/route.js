import { db } from "@/config/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { coursesTable, usersTable } from "@/config/schema";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    const result = await db.select().from(coursesTable)
        .where(eq(coursesTable.cid, courseId));

    console.log(result);

    return NextResponse.json(result[0]);
}