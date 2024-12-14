"use client";
import Image from "next/image";
import Navbar from "../navbar/navbar";
import VoxelDog from "@/components/voxelDog";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaWhatsapp, FaPaperPlane, FaMicrophone } from "react-icons/fa";

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return displayedText;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col p-2 sm:p-3 mx-auto text-white">
      <div className="w-full">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center mt-2 space-y-4 sm:space-y-6 px-3 sm:px-6 lg:px-8">
        <div className="relative w-[90%] sm:w-[80%] h-[250px] sm:h-[300px] md:h-[400px] flex items-center justify-center">
          <div className="w-full h-full" style={{ minHeight: "300px" }}>
            <VoxelDog />
          </div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl flex items-center flex-wrap justify-center text-center gap-2 px-2"
        >
          <motion.span
            initial={{ rotate: -30 }}
            animate={{ rotate: 20 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
          >
            👋
          </motion.span>
          <span>Hi, my name is </span>
          <span className="font-bold text-blue-400">
            <TypewriterText text="Nowayte" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm mx-auto"
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="w-full px-4 py-3 pr-24 bg-gray-900/50 backdrop-blur-sm text-white 
                 rounded-lg border border-gray-700 outline-none
                 focus:border-purple-500 transition-colors duration-200"
            />
            <div className="absolute right-2 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 hover:text-purple-500 transition-colors duration-200"
              >
                <FaMicrophone className="text-lg" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="p-2 text-gray-400 hover:text-purple-500 transition-colors duration-200"
              >
                <FaPaperPlane className="text-lg" />
              </motion.button>
            </div>
          </div>
        </motion.div>
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
