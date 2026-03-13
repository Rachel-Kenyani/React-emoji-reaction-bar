import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactionBarProps } from "../types";

import "../styles.css";

export default function ReactionBar({
  reactions = ["👍", "❤️", "😂", "🎉"],
  onReact,
}: ReactionBarProps) {
  const nextIdRef = useRef(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [floating, setFloating] = useState<{ emoji: string; id: number }[]>([]);

  const handleReact = (emoji: string) => {
    setSelected(emoji);
    onReact?.(emoji);

    const id = nextIdRef.current++;
    setFloating((prev) => [...prev, { emoji, id }]);

    setTimeout(() => {
      setFloating((prev) => prev.filter((f) => f.id !== id));
    }, 900);
  };

  return (
    <div className="container">
      {reactions.map((emoji) => (
        <motion.button
          key={emoji}
          className="button"
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: selected === emoji ? 1.25 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 20,
          }}
          onClick={() => handleReact(emoji)}
        >
          {emoji}
        </motion.button>
      ))}

      {/* Floating emojis */}
      <div className="floatingLayer">
        <AnimatePresence>
          {floating.map((f) => (
            <motion.span
              key={f.id}
              className="floatingEmoji"
              initial={{ y: 0, opacity: 1, scale: 1 }}
              animate={{ y: -60, opacity: 0, scale: 1.6 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 10,
                duration: 0.9,
              }}
            >
              {f.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
