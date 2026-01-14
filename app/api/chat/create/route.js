import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Use auth() and await it
        const authResult = await auth();
        const userId = authResult?.userId;
        
        if(!userId) {
            return NextResponse.json(
                {success: false, message: "User not authenticated"}, 
                { status: 401 }
            )
        }

        // prepare the chat data to be saved in the database
        const chatData = {
            userId,
            messages: [],
            name: "New Chat",
            question: "",
        };

        // connect to the database and create a new chat 
        await connectDB();
        const newChat = await Chat.create(chatData);

        return NextResponse.json({ 
            success: true, 
            message: "Chat created successfully",
            chat: newChat
        }, { status: 201 });

    } catch (error) {
        console.error("Create chat error details:", error);
        return NextResponse.json({ 
            success: false, 
            error: error.message,
            details: error.toString()
        }, { status: 500 });
    }
}