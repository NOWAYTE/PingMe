// app/api/telegram/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      }),
    });
    
    const textResponse = await response.text();  // Read as text first
    console.log('Telegram response:', textResponse);  // Log the response
    
    const data = JSON.parse(textResponse);  // Parse it manually if it's valid JSON
    if (!response.ok) {
      const textResponse = await response.text();
      console.error('Telegram API error:', textResponse);  // Log the error page
      return NextResponse.json({ error: 'Failed to send message' }, { status: response.status });
    }
    
    
    if (!data.ok) {
      return NextResponse.json({ error: data.description }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}