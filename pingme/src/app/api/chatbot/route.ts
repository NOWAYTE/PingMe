// /app/api/chatbot/route.ts

import { NextResponse } from 'next/server';
import { chatbot } from '@/lib/chatbot'; // Import from the lib folder

export async function POST(req: Request) {
  try {
    const { message } = await req.json(); // Parse the incoming JSON message
    const response = await chatbot(message); // Call the chatbot API handler
    return NextResponse.json(response); // Return the chatbot response
  } catch (error) {
    return NextResponse.json({ error: 'Failed to communicate with the chatbot' }, { status: 500 });
  }
}
