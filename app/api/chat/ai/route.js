import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Chat from "@/models/Chat";

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ 
                success: false, 
                message: "Unauthorized" 
            }, { status: 401 });
        }

        const { chatId, prompt } = await req.json();

        if (!chatId || !prompt) {
            return NextResponse.json({ 
                success: false, 
                message: "chatId and prompt are required" 
            }, { status: 400 });
        }

        await connectDB();

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return NextResponse.json({ 
                success: false, 
                message: "Chat not found" 
            }, { status: 404 });
        }

        if (chat.userId !== userId) {
            return NextResponse.json({ 
                success: false, 
                message: "Unauthorized access to chat" 
            }, { status: 403 });
        }

        // ← ADD THIS: Save the user's message first
        const userMessage = {
            role: 'user',
            content: prompt,
            timestamp: Date.now()
        };
        chat.messages.push(userMessage);

        // ← ADD THIS: If this is the first message, set the question field
        if (chat.messages.length === 1) {
            chat.question = prompt;
        }

        // ← ADD THIS: Update chat name if it's still "New Chat"
        if (chat.name === "New Chat") {
            chat.name = prompt.substring(0, 50); // First 50 chars
        }

        // Generate AI response
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const assistantMessage = {
            role: 'assistant',
            content: text,
            timestamp: Date.now()
        };

        chat.messages.push(assistantMessage);
        chat.updatedAt = new Date();
        await chat.save();

        return NextResponse.json({ 
            success: true, 
            data: assistantMessage,
            message: "Response generated successfully"
        });

    } catch (error) {
        console.error('Chat AI API Error:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Failed to generate response"
        }, { status: 500 });
    }
}