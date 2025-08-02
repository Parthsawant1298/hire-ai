"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, createContext, useContext } from "react";

// Context
const EpicTransitionsContext = createContext(undefined);

// Hook
export function useEpicTransitions() {
  const ctx = useContext(EpicTransitionsContext);
  if (!ctx)
    throw new Error(
      "useEpicTransitions must be used within EpicTransitionsProvider"
    );
  return ctx;
}

// Provider
export function EpicTransitionsProvider({
  children,
  defaultTransition = "wormhole",
  soundEnabled = true,
}) {
  const [currentTransition, setCurrentTransition] = useState(defaultTransition);
  const [soundEnabledState, setSoundEnabledState] = useState(soundEnabled);
  const [triggerCount, setTriggerCount] = useState(0);

  const setTransition = (type) => setCurrentTransition(type);
  const triggerTransition = () => setTriggerCount((c) => c + 1);

  const value = {
    currentTransition,
    setTransition,
    triggerTransition,
    soundEnabled: soundEnabledState,
    setSoundEnabled: setSoundEnabledState,
  };

  return (
    <EpicTransitionsContext.Provider value={value}>
      <EpicPageTransition
        transitionType={currentTransition}
        trigger={triggerCount}
        soundEnabled={soundEnabledState}
      >
        {children}
      </EpicPageTransition>
    </EpicTransitionsContext.Provider>
  );
}

export default function EpicPageTransition({
  children,
  transitionType,
  trigger = 0,
  soundEnabled = true,
}) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousPath, setPreviousPath] = useState("");
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);

  // Check if transitioning to home page (only when coming FROM another page)
  const isGoingToHome =
    (pathname === "/" || pathname === "/main") &&
    previousPath !== "" &&
    previousPath !== pathname;

  useEffect(() => {
    setPreviousPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (soundEnabled && !audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      } catch (e) {
        // Ignore if AudioContext not supported
      }
    }
  }, [soundEnabled]);

  const playSound = (type) => {
    if (!soundEnabled || !audioContextRef.current) return;
    try {
      const audioContext = audioContextRef.current;
      const createSound = (frequency, duration, waveType = "sine") => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(
          Math.max(20, frequency),
          audioContext.currentTime
        );
        oscillator.type = waveType;
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          0.2,
          audioContext.currentTime + 0.01
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + Math.max(0.1, duration)
        );
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + Math.max(0.1, duration));
      };
      const soundPatterns = {
        wormhole: () => {
          createSound(80, 2, "sawtooth");
          setTimeout(() => createSound(120, 1.5, "sine"), 200);
          setTimeout(() => createSound(200, 1, "triangle"), 500);
        },
        timewarp: () => {
          createSound(440, 0.5, "square");
          setTimeout(() => createSound(220, 0.5, "square"), 100);
          setTimeout(() => createSound(110, 1, "sawtooth"), 200);
        },
        quantum: () => {
          createSound(800, 0.3, "sine");
          setTimeout(() => createSound(1200, 0.2, "sine"), 100);
          setTimeout(() => createSound(600, 0.4, "triangle"), 200);
        },
        dimension: () => {
          createSound(60, 2.5, "sawtooth");
          setTimeout(() => createSound(90, 2, "square"), 300);
        },
        cosmic: () => {
          createSound(40, 3, "sawtooth");
          setTimeout(() => createSound(80, 2, "triangle"), 200);
          setTimeout(() => createSound(160, 1.5, "sine"), 500);
        },
        nuclear: () => {
          createSound(30, 4, "sawtooth");
          setTimeout(() => createSound(60, 3, "square"), 100);
          setTimeout(() => createSound(120, 2, "triangle"), 300);
        },
        vortex: () => {
          createSound(150, 2, "sine");
          setTimeout(() => createSound(300, 1.5, "triangle"), 200);
          setTimeout(() => createSound(450, 1, "square"), 400);
        },
      };
      if (soundPatterns[type]) soundPatterns[type]();
    } catch (e) {
      // Ignore errors
    }
  };

  useEffect(() => {
    // No transitions - just track path changes
    setPreviousPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (transitionType === "wormhole" && isTransitioning && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let time = 0;
      const animate = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < 20; i++) {
          const radius = Math.max(0, i * 50 + ((time * 10) % 1000));
          const opacity = Math.max(0, 1 - radius / 1000);
          if (opacity > 0 && radius > 0) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0, 150, 255, ${opacity})`;
            ctx.lineWidth = 3;
            ctx.stroke();
            const innerRadius = Math.max(0, radius - 5);
            if (innerRadius > 0) {
              ctx.beginPath();
              ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
        for (let i = 0; i < 100; i++) {
          const angle = (i / 100) * Math.PI * 2 + time * 0.02;
          const distance = Math.max(0, 50 + ((time * 5) % 500));
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          const particleOpacity = Math.max(0, 1 - distance / 500);
          if (particleOpacity > 0) {
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 200, 255, ${particleOpacity})`;
            ctx.fill();
          }
        }
        time += 1;
        if (time < 180) requestAnimationFrame(animate);
      };
      animate();
    }
  }, [transitionType, isTransitioning]);

  const getTransitionVariants = () => {
    // Simple no-transition variants
    const simpleTransition = {
      exit: { opacity: 1 },
      initial: { opacity: 1 },
      animate: { opacity: 1 },
    };

    return simpleTransition;
  };

  return <div className="relative">{children}</div>;
}
