import React from "react";
import useMeasure from "react-use-measure";
import { motion } from "framer-motion";


export default function ResizablePanel({ children }: { children: React.ReactNode }) {
    let [ref, { height }] = useMeasure();

    return (
      <motion.div
        animate={height ? { height } : {}}
        style={height ? { height } : {}}
        className="realtive w-full overflow-hidden"
        transition={{ type: "tween", duration: 0.5 }}
      >
        <div ref={ref} className={height ? "absolute inset-x-0" : "relative"}>
          {children}
        </div>
      </motion.div>
    );

}