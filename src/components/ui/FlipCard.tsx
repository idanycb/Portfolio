"use client";

import { motion } from "motion/react";
import { useState } from "react";

type FlipCardProps = {
  className?: string;
  children: [React.ReactElement, React.ReactElement];
};
type FacesProps = {
  children: React.ReactNode;
};

const variants = {
  front: {
    rotateY: 0,
  },
  back: {
    rotateY: 180,
  },
};

const FlipCard = ({ className, children }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      className={"perspective-distant " + className}
    >
      <motion.div
        animate={isFlipped ? "back" : "front"}
        variants={variants}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative h-full w-full transform-3d"
      >
        {children}
      </motion.div>
    </div>
  );
};

FlipCard.Front = function FlipCardFront({ children }: FacesProps) {
  return (
    <motion.div className="absolute flex h-full w-full items-center justify-center backface-hidden">
      {children}
    </motion.div>
  );
};

FlipCard.Back = function FlipCardBack({ children }: FacesProps) {
  return (
    <motion.div className="absolute flex h-full w-full rotate-y-180 items-center justify-center backface-hidden">
      {children}
    </motion.div>
  );
};

export default FlipCard;
