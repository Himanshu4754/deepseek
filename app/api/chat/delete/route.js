import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const user = await currentUser();
        
        if(!user) {
            return NextResponse.json({success: false, message: "User not authenticated"}, { status: 401 })
        }

        const userId = user.id;
        const { chatId } = await req.json();

        await connectDB();
        const chat = await Chat.findOneAndDelete({ _id: chatId, userId });

        if(!chat) {
            return NextResponse.json({success: false, message: "Chat not found"}, { status: 404 })
        }

        return NextResponse.json({ 
            success: true, 
            message: "Chat deleted successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Delete chat error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}