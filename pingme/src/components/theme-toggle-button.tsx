"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiSunLine, RiMoonClearFill } from "react-icons/ri";

const ThemeToggleButton = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      rotate: 180,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    tap: {
      scale: 0.9,
      rotate: 360
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    },
    exit: { 
      scale: 0,
      rotate: 180,
      transition: {
        duration: 0.3
      }
    }
  };

  const glowVariants = {
    hover: {
      scale: 1.5,
      opacity: 0.5,
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {isHovered && (
          <motion.div
            className={`absolute inset-0 rounded-full blur-xl ${
              darkMode ? "bg-yellow-300" : "bg-blue-300"
            }`}
            variants={glowVariants}
            animate="hover"
          />
        )}
        <motion.button
          onClick={toggleTheme}
          className={`relative p-3 rounded-full backdrop-blur-sm shadow-lg
            ${darkMode 
              ? "bg-gray-800/80 text-yellow-300 shadow-yellow-500/20" 
              : "bg-white/80 text-blue-500 shadow-blue-500/20"
            } 
            transition-colors duration-300`}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Toggle theme"
        >
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={iconVariants}
            key={darkMode ? "dark" : "light"}
          >
            {darkMode ? (
              <RiSunLine className="w-6 h-6" />
            ) : (
              <RiMoonClearFill className="w-6 h-6" />
            )}
          </motion.div>
        </motion.button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-medium
          ${darkMode ? "text-yellow-300" : "text-blue-500"}
          opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
      >
        {/* {darkMode ? "Light Mode" : "Dark Mode"} */}
      </motion.div>
    </div>
  );
};

export default ThemeToggleButton;