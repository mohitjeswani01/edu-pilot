import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { and, eq, desc } from "drizzle-orm";


export async function POST(req) {
    // Wrapped in try...catch to prevent server crashes
    try {
        const { courseId } = await req.json();
        const user = await currentUser();

        if (!user || !user.primaryEmailAddress?.emailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress.emailAddress;

        // Check if the course is already enrolled
        const enrolledCourses = await db.select().from(enrollCourseTable)
            .where(and(
                eq(enrollCourseTable.userEmail, userEmail),
                eq(enrollCourseTable.cid, courseId)
            ));

        if (enrolledCourses.length > 0) {
            // If already enrolled, return the specific response
            return NextResponse.json({ resp: 'Already Enrolled' }, { status: 200 });
        }

        // If not enrolled, insert the new record
        const result = await db.insert(enrollCourseTable)
            .values({
                cid: courseId,
                userEmail: userEmail
            }).returning({ id: enrollCourseTable.id });

        return NextResponse.json(result, { status: 201 }); // Use 201 for Created

    } catch (error) {
        console.error("[ENROLL_COURSE_ERROR]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// --- The rest of your GET and PUT functions remain the same ---
export async function GET(req) {
    const user = await currentUser();
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    if (courseId) {
        const result = await db.select().from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
                eq(enrollCourseTable.cid, courseId)))
        return NextResponse.json(result);

    } else {
        const result = await db.select().from(coursesTable)
            .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
            .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
            .orderBy(desc(enrollCourseTable.id));

        return NextResponse.json(result);
    }
}

export async function PUT(req) {
    const { completedChapter, courseId } = await req.json();
    const user = await currentUser();

    const result = await db.update(enrollCourseTable).set({
        completedChapters: completedChapter
    }).where(and(eq(enrollCourseTable.cid, courseId),
        eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress)))
        .returning(enrollCourseTable)

    return NextResponse.json(result);
}