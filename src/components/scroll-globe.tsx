"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(() => import("./cobe-globe"), { ssr: false });

export default function ScrollGlobe() {
  const { scrollYProgress } = useScroll();

  // Scale: starts at 1, grows to 2.5 as user scrolls — epic zoom effect
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.65, 0.8, 1], [1, 1.3, 1.6, 1.2, 2.0, 2.5]);

  // Horizontal movement: globe drifts left as user scrolls deeper
  const x = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], ["0%", "-5%", "-20%", "-10%", "-15%"]);

  // Vertical movement: subtle vertical shift per section
  const y = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.65, 1], ["0%", "5%", "0%", "10%", "15%"]);

  // Opacity: globe stays visible throughout, slight fade in footer
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0.6]);

  return (
    <div className="scroll-globe">
      <motion.div className="scroll-globe__inner" style={{ scale, x, y, opacity }}>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <CobeGlobe />
        </motion.div>
      </motion.div>
    </div>
  );
}
