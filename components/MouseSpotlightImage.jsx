"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const defaultTitleClass = "text-white text-2xl font-bold mb-2";
const defaultSubtitleClass = "text-white/80 text-sm";

const MouseSpotlightImage = ({
  primaryImage,
  backgroundImage,
  alt = "Spotlight Image",
  title,
  subtitle,
  width = 400,
  height = 300,
  spotlightRadius = 85,
  className = "",
  titleClassName = defaultTitleClass,
  subtitleClassName = defaultSubtitleClass,
  splashType = "algae", // 'algae' | 'organic' | 'splash'
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [flowTime, setFlowTime] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => setFlowTime((t) => t + 0.02), 16);
      return () => clearInterval(interval);
    } else {
      setFlowTime(0);
    }
  }, [isHovered]);

  // -------- Spotlight shape generators --------

  const createOrganicShape = (cx, cy, size) => {
    if (size === 0) return "circle(0px at 50% 50%)";
    const time = flowTime;
    const points = [];
    const numPoints = 32;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const noise1 = Math.sin(angle * 4 + time * 1.2) * 0.6;
      const noise2 = Math.cos(angle * 7 + time * 0.8) * 0.4;
      const noise3 = Math.sin(angle * 9 + time * 1.5) * 0.35;
      const noise4 = Math.cos(angle * 3 + time * 2.1) * 0.5;
      const noise5 = Math.sin(angle * 11 + time * 0.6) * 0.3;
      const noise6 = Math.cos(angle * 13 + time * 1.8) * 0.25;
      const radiusVariation =
        0.4 + 0.6 * (0.5 + noise1 + noise2 + noise3 + noise4 + noise5 + noise6);
      const radius = size * Math.max(0.3, radiusVariation) * 1.8;

      const splashFlow1 = Math.sin(angle * 5 + time * 1.8) * size * 0.8;
      const splashFlow2 = Math.cos(angle * 8 + time * 1.3) * size * 0.6;
      const organicFlow1 = Math.cos(angle * 6 + time * 1.1) * size * 0.7;
      const organicFlow2 = Math.sin(angle * 10 + time * 0.9) * size * 0.45;

      const x =
        cx +
        Math.cos(angle) * radius +
        splashFlow1 * Math.sin(time * 1.3 + angle) +
        splashFlow2 * Math.cos(time * 0.7 + angle * 2);
      const y =
        cy +
        Math.sin(angle) * radius +
        organicFlow1 * Math.cos(time * 0.9 + angle * 1.7) +
        organicFlow2 * Math.sin(time * 1.4 + angle * 1.2);

      points.push({ x, y });
    }

    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const nextNext = points[(i + 2) % points.length];
      const prev = points[(i - 1 + points.length) % points.length];
      const smoothing = 0.3;
      const cp1x = current.x + (next.x - prev.x) * smoothing;
      const cp1y = current.y + (next.y - prev.y) * smoothing;
      const cp2x = next.x - (nextNext.x - current.x) * smoothing;
      const cp2y = next.y - (nextNext.y - current.y) * smoothing;
      pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    pathData += " Z";
    return `path('${pathData}')`;
  };

  const createSplashShape = (cx, cy, size) => {
    if (size === 0) return "circle(0px at 50% 50%)";
    const time = flowTime;
    const points = [];
    const numPoints = 24;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const baseNoise = Math.sin(angle * 4 + time) * 0.8;
      const detailNoise = Math.sin(angle * 15 + time * 2) * 0.5;
      const dripNoise = Math.sin(angle * 8 + time * 1.2) * 0.7;
      const randomFactor = Math.sin(angle * 20 + time * 3) * 0.4;
      let radius =
        size * (1.2 + baseNoise + detailNoise + dripNoise + randomFactor) * 1.6;
      if (Math.sin(angle * 6 + time) > 0.3) radius *= 2.5;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      points.push({ x, y });
    }

    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      pathData += ` L ${points[i].x} ${points[i].y}`;
    }
    pathData += " Z";
    return `path('${pathData}')`;
  };

  const createComplexAlgaeShape = (cx, cy, size) => {
    if (size === 0) return "circle(0px at 50% 50%)";
    const time = flowTime;
    const points = [];
    const numPoints = 28;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const noise1 = Math.sin(angle * 4 + time * 1.2) * 0.45;
      const noise2 = Math.cos(angle * 7 + time * 0.8) * 0.35;
      const noise3 = Math.sin(angle * 9 + time * 1.5) * 0.3;
      const noise4 = Math.cos(angle * 3 + time * 2.1) * 0.4;
      const noise5 = Math.sin(angle * 11 + time * 0.6) * 0.25;
      const noise6 = Math.cos(angle * 13 + time * 1.8) * 0.3;
      const radiusVariation =
        0.3 + 0.7 * (0.5 + noise1 + noise2 + noise3 + noise4 + noise5 + noise6);
      const radius = size * Math.max(0.2, radiusVariation) * 1.5;

      const tentacleFlow1 = Math.sin(angle * 5 + time * 1.8) * size * 0.6;
      const tentacleFlow2 = Math.cos(angle * 8 + time * 1.3) * size * 0.4;
      const organicFlow1 = Math.cos(angle * 6 + time * 1.1) * size * 0.5;
      const organicFlow2 = Math.sin(angle * 10 + time * 0.9) * size * 0.35;
      const complexFlow = Math.sin(angle * 12 + time * 2.2) * size * 0.3;
      const microFlow = Math.cos(angle * 15 + time * 1.7) * size * 0.2;

      const x =
        cx +
        Math.cos(angle) * radius +
        tentacleFlow1 * Math.sin(time * 1.3 + angle) +
        tentacleFlow2 * Math.cos(time * 0.7 + angle * 2) +
        complexFlow * Math.sin(time * 1.9 + angle * 0.5);
      const y =
        cy +
        Math.sin(angle) * radius +
        organicFlow1 * Math.cos(time * 0.9 + angle * 1.7) +
        organicFlow2 * Math.sin(time * 1.4 + angle * 1.2) +
        microFlow * Math.cos(time * 2.3 + angle * 0.8);
      points.push({ x, y });
    }

    let pathData = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const nextNext = points[(i + 2) % points.length];
      const prev = points[(i - 1 + points.length) % points.length];
      const smoothing = 0.25;
      const cp1x = current.x + (next.x - prev.x) * smoothing;
      const cp1y = current.y + (next.y - prev.y) * smoothing;
      const cp2x = next.x - (nextNext.x - current.x) * smoothing;
      const cp2y = next.y - (nextNext.y - current.y) * smoothing;
      pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }
    pathData += " Z";
    return `path('${pathData}')`;
  };

  // Cursor indicator border-radius logic
  const getIndicatorBorderRadius = () => {
    if (splashType === "algae")
      return `${35 + Math.sin(flowTime * 1.2) * 30}% ${
        70 + Math.cos(flowTime * 0.8) * 25
      }% ${30 + Math.sin(flowTime * 1.5) * 35}% ${
        80 + Math.cos(flowTime * 1.1) * 20
      }% / ${60 + Math.sin(flowTime * 0.9) * 25}% ${
        25 + Math.cos(flowTime * 1.3) * 30
      }% ${75 + Math.sin(flowTime * 1.7) * 20}% ${
        40 + Math.cos(flowTime * 0.7) * 40
      }%`;
    if (splashType === "splash")
      return `${20 + Math.sin(flowTime * 2) * 40}% ${
        80 + Math.cos(flowTime * 1.5) * 15
      }% ${15 + Math.sin(flowTime * 1.8) * 50}% ${
        85 + Math.cos(flowTime * 2.2) * 10
      }%`;
    return `${40 + Math.sin(flowTime * 1.5) * 25}% ${
      60 + Math.cos(flowTime * 1.2) * 20
    }% ${45 + Math.sin(flowTime * 1.8) * 30}% ${
      55 + Math.cos(flowTime * 1.4) * 25
    }%`;
  };

  // Render
  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-lg cursor-none no-ripple ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setFlowTime(0);
      }}
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Background image (always visible) */}
      <div className="absolute inset-0 z-10">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={`${alt} background`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* White overlay with organic spotlight reveal */}
      <motion.div
        className="absolute inset-0 z-20 bg-white"
        style={{
          mask: isHovered
            ? `radial-gradient(circle ${spotlightRadius}px at ${
                mousePosition.x
              }px ${mousePosition.y}px, transparent ${
                spotlightRadius - 20
              }px, black ${spotlightRadius}px)`
            : undefined,
          WebkitMask: isHovered
            ? `radial-gradient(circle ${spotlightRadius}px at ${
                mousePosition.x
              }px ${mousePosition.y}px, transparent ${
                spotlightRadius - 20
              }px, black ${spotlightRadius}px)`
            : undefined,
        }}
        animate={{
          opacity: isHovered ? 0.95 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Text overlay */}
      {(title || subtitle) && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-black/60 to-transparent p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          {title && (
            <motion.h3
              className={titleClassName}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h3>
          )}
          {subtitle && (
            <motion.p
              className={subtitleClassName}
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Cursor indicator */}
      {isHovered && (
        <motion.div
          className="absolute pointer-events-none z-50 transition-all duration-300 ease-out opacity-20"
          style={{
            left: mousePosition.x - spotlightRadius * 1.5,
            top: mousePosition.y - spotlightRadius * 1.5,
            width: spotlightRadius * 3,
            height: spotlightRadius * 3,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div
            className="w-full h-full border border-green-400/50 transition-all duration-600"
            style={{
              borderRadius: getIndicatorBorderRadius(),
              transform: `rotate(${flowTime * 12}deg) scale(${
                1 + Math.sin(flowTime * 2.2) * 0.15
              })`,
              boxShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
              filter: "blur(2px)",
            }}
          />
        </motion.div>
      )}

      {/* Hint overlay */}
      {!isHovered && (
        <motion.div
          className="absolute bottom-4 right-4 text-gray-700 text-xs bg-white/90 px-3 py-2 rounded-full backdrop-blur-sm shadow-sm border z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Hover to reveal image
        </motion.div>
      )}
    </motion.div>
  );
};

export default MouseSpotlightImage;
