import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req) {
    try {
        const { email, name } = await req.json();
        console.log("Received:", email, name);

        const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
        console.log("Existing users:", users);

        if (users.length === 0) {
            const result = await db.insert(usersTable).values({
                name,
                email,
                subscriptionId: "default-subscription"
            }).returning();
            console.log("Inserted user:", result);
            return NextResponse.json(result[0]);  // <<- IMPORTANT
        }

        console.log("User already exists:", users[0]);
        return NextResponse.json(users[0]);
    } catch (err) {
        console.error("Error in POST /api/user:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
