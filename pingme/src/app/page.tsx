"use client";
import Image from "next/image";
import Navbar from "../navbar/navbar";
import VoxelDog from "@/components/voxelDog";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaPaperPlane, FaMicrophone } from "react-icons/fa";
import ChatBubbble from "@/components/chatbubble/chat-bubble";

export default function Home() {
  const [message, setMessage] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);


  return (
    <div className="min-h-screen w-full flex flex-col p-2 sm:p-3 mx-auto text-white">
      {/* <div className="w-full">
        <Navbar />
      </div> */}

      <div className="flex-1 flex flex-col items-center justify-center mt-2 space-y-4 sm:space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="relative w-[90%] sm:w-[80%] h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center">
          <div className="w-full h-full" style={{ minHeight: "300px" }}>
            <VoxelDog />
          </div>
        </div>

        <ChatBubbble />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-screen-lg mx-auto px-4"
      >
        <hr className="border-gray-700 my-4" />
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full text-center py-2"
      >
        <p className="text-xs sm:text-sm">
          GitHub:{" "}
          <a
            href="https://github.com/NOWAYTE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 rounded relative group"
          >
            @nowayte
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 origin-left transform scale-x-0 transition-transform group-hover:scale-x-100"
              initial={false}
            />
          </a>
        </p>
      </motion.footer>
    </div>
  );
}
