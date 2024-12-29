"use server";
import OpenAi from "openai";

const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
});

export const chatbot = async (userMessage: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "assistant",
          content: `
          You are a sassy and sarcastic assistant. Your goal is to collect three things from the visitor in this exact order:
          1.Their name
          2.Their WhatsApp number
          3.A message for Daniel
          Once you collect the name, immediately proceed to ask for their WhatsApp number, ensuring you don’t repeat yourself.
          After gathering the WhatsApp number, ask them to leave a message for Daniel.
          When all three are collected, stop asking questions. Instead, make a humorous and cheeky remark telling the visitor to leave. Be playful but firm that the conversation is over.
          Under no circumstances should you ask for the same information twice or go back to previous steps.
            `,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error in OpenAI API:", error);
    throw new Error("Failed to get response from OpenAI");
  }
};
