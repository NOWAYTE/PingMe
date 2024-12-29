"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Import chatbot API function
import { chatbot } from "../../lib/chatbot";

type Props = {};

const ChatBubble = (props: Props) => {
  const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");

  const phoneRegex = /(\+254\d{9}|0\d{9}|\d{9})/;

const extractPhoneNumber = (message: string) => {
  const match = message.match(phoneRegex);
  if (match) {
    let phoneNumber = match[0].replace(/\D/g, ""); 

    if (phoneNumber.startsWith("0")) {
      phoneNumber = "254" + phoneNumber.slice(1);
    }

    const whatsApp =  `https://wa.me/${phoneNumber}`

    return {
      phoneNumber,
      whatsApp,
    }
  }
  return null;
};


  const handleSend = async () => {
    if (!input.trim()) return;

    const phoneNumber = extractPhoneNumber(input);

    if (phoneNumber) {
      await sendToTelegramBot(phoneNumber.whatsApp);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Got is your phone number is ${phoneNumber.phoneNumber}`, isBot: false },
      ]);
    } else if (input.length > 20) {
      await sendToTelegramBot(input);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `${input}`, isBot: false },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, isBot: false },
      ]);
    }

    try {
      const botResponse: string =
        (await chatbot(input)) || "Error: No response from chatbot";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, isBot: true },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error communicating with chatbot", isBot: true },
      ]);
    }

    setInput("");
  };

  // Send the message to Telegram bot
  const sendToTelegramBot = async (message: string ) => {
    if (!message) {
      console.error("Message is empty");
      return;
    }

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Failed to send message:", data.error);
        return;
      }

      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    setMessages([
      {
        text: "Scanned the door, huh? Well, I’m either not home or just avoiding you. What’s up? I’ll be back when I feel like it.",
        isBot: true,
      },
    ]);
  }, []);

  return (
    <div className="relative w-full max-w-[400px] h-[450px] bg-transparent flex flex-col">
      <div
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isBot ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`shadow-2xl inline-block p-3 max-w-[80%] rounded-lg transition-all duration-300 ${
                message.isBot
                  ? "dark:bg-[#1a202c] text-gray-500 dark:text-white"
                  : "bg-[#2C261A] text-gray-300 dark:text-gray-500 shadow-lg"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-2 flex space-x-3 bg-transparent">
        <Input
          className="w-full p-3 border-2 rounded-lg dark:bg-gray-600 text-gray-300 dark:text-white  focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300 focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          onClick={handleSend}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBubble;
