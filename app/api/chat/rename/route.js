import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const user = await currentUser();
        
        if(!user) {
            return NextResponse.json({success: false, message: "User not authenticated"}, { status: 401 })
        }

        const userId = user.id;
        const { chatId, name } = await req.json();

        await connectDB();
        const chat = await Chat.findOneAndUpdate(
            { _id: chatId, userId },
            { name },
            { new: true }
        );

        if(!chat) {
            return NextResponse.json({success: false, message: "Chat not found"}, { status: 404 })
        }

        return NextResponse.json({ 
            success: true, 
            message: "Chat renamed successfully",
            chat
        }, { status: 200 });

    } catch (error) {
        console.error("Rename chat error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}