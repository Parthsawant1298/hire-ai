"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import { useEpicTransitions } from "./index"; // Adjust the import path if the hook is in another location

export default function TransitionControls() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTransition, setTransition, triggerTransition } = useEpicTransitions();

  const transitions = [
    { type: "wormhole", label: "🌌 Wormhole", color: "bg-blue-500" },
    { type: "quantum", label: "⚛️ Quantum", color: "bg-purple-500" },
    { type: "cosmic", label: "💥 Cosmic", color: "bg-red-500" },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Control Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 bg-black/90 rounded-lg p-4 text-white"
        >
          <h3 className="text-lg font-bold mb-3">Epic Transitions</h3>

          {transitions.map((transition) => (
            <button
              key={transition.type}
              onClick={() => {
                setTransition(transition.type);
                triggerTransition();
              }}
              className={`block w-full mb-2 p-2 rounded text-left hover:bg-white/10 ${
                currentTransition === transition.type ? "bg-white/20" : ""
              }`}
            >
              {transition.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}
