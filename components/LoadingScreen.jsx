"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const loadingTexts = [
    "CONNECTING YOU TO TOP AI TALENT",
    "PREPARING YOUR HIRING EXPERIENCE", 
    "MATCHING SKILLS WITH OPPORTUNITIES",
    "OPTIMIZING AI RECRUITMENT PROCESS",
    "FINALIZING YOUR HIREAI PLATFORM",
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(100, prev + Math.random() * 5 + 2);

        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 1000);
        }

        return newProgress;
      });
    }, 300);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete, loadingTexts.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 text-center px-8 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <span className="text-2xl text-gray-900 font-bold tracking-widest block mb-2">
            {Math.floor(progress)}%
          </span>
          <span className="text-sm text-gray-600 tracking-widest">
            LOADING PROGRESS
          </span>
        </motion.div>

        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentText}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight tracking-tight px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              style={{
                lineHeight: "1.1",
                minHeight: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loadingTexts[currentText]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="w-full max-w-lg mx-auto mb-16"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p className="text-sm text-gray-600 tracking-widest uppercase font-light">
            Please wait
          </p>
          <p className="text-xs text-gray-500 tracking-widest uppercase font-light mt-1">
            while we prepare your AI hiring experience.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
