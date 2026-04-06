"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const CobeGlobe = dynamic(() => import("./cobe-globe"), { ssr: false });

export default function ScrollGlobe() {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 2.5]);
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div className="scroll-globe">
      <motion.div className="scroll-globe__inner" style={{ scale, x, y }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <CobeGlobe />
        </motion.div>
      </motion.div>
    </div>
  );
}
