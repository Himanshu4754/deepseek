import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const authResult = await auth();
        const userId = authResult?.userId;

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "User not authenticated" }, 
                { status: 401 }
            );
        }

        // connect to the database and fetch chats for the authenticated user
        await connectDB();
        const data = await Chat.find({ userId });

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (error) {
        console.error("Get chats error details:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message,
            details: error.toString()
        }, { status: 500 });
    }
}