"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GlobalRippleEffect = () => {
  const [ripples, setRipples] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isOverExcludedElement, setIsOverExcludedElement] = useState(false);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Simplified exclusion check
      const target = e.target;
      const isExcluded =
        target.closest(".no-ripple, .cursor-none") ||
        target.tagName === "IMG" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A";

      setIsOverExcludedElement(isExcluded);
    };

    const handleClick = (e) => {
      // Simplified exclusion check for clicks
      const target = e.target;
      const isExcluded =
        target.closest(".no-ripple, .cursor-none") ||
        target.tagName === "IMG" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A";

      if (isExcluded) return;

      const newRipple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 1500);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 40 }}>
      {/* Mouse Follower Bubble - Always visible for testing */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x - 10,
          top: mousePosition.y - 10,
          zIndex: 41,
        }}
        initial={{ scale: 0 }}
        animate={{
          scale: isOverExcludedElement ? 0 : 1,
          opacity: isOverExcludedElement ? 0 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-5 h-5 bg-blue-500 rounded-full shadow-lg border-2 border-white">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-pulse" />
        </div>
      </motion.div>

      {/* Floating Ring */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x - 15,
          top: mousePosition.y - 15,
          zIndex: 40,
        }}
        animate={{
          scale: isOverExcludedElement ? 0 : [1, 1.2, 1],
          opacity: isOverExcludedElement ? 0 : 0.6,
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 0.2 },
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="w-8 h-8 border-2 border-blue-400/60 rounded-full" />
      </motion.div>

      {/* Click Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x - 30,
              top: ripple.y - 30,
              zIndex: 39,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 4, 6],
              opacity: [1, 0.6, 0],
            }}
            exit={{ scale: 8, opacity: 0 }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            <div className="w-15 h-15 border-3 border-blue-400 rounded-full" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Secondary Ripple Effect */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={`secondary-${ripple.id}`}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x - 20,
              top: ripple.y - 20,
              zIndex: 9998,
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{
              scale: [0, 3, 5],
              opacity: [0.8, 0.4, 0],
            }}
            exit={{ scale: 6, opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: 0.1,
            }}
          >
            <div className="w-10 h-10 bg-purple-400/30 rounded-full blur-sm" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GlobalRippleEffect;
