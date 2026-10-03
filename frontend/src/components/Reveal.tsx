import { motion } from "motion/react";
import type { ElementType, ReactNode } from "react";

interface RevealProps {
  as?: string;
  className?: string;
  children?: ReactNode;
  delay?: number;
  y?: number;
  [key: string]: unknown;
}

export const Reveal = ({
  as = "div",
  className,
  children,
  delay = 0,
  y = 26,
  ...rest
}: RevealProps) => {
  const MotionTag = ((motion as unknown as Record<string, ElementType>)[as] ||
    motion.div) as ElementType;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};
