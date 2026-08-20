"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TypingAnimationProps {
  text?: string;
  words?: string[];
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDelay?: number;
  loop?: boolean;
}

export function TypingAnimation({
  text,
  words = [],
  className,
  typeSpeed = 50,
  deleteSpeed = 50,
  pauseDelay = 2000,
  loop = false,
}: TypingAnimationProps) {
  const items = React.useMemo(() => text ? [text] : words, [text, words]);
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        // Only delete if looping is true, or if we have more words to cycle through
        if (loop || (items.length > 1 && wordIndex < items.length - 1)) {
          setIsDeleting(true);
        }
      }, pauseDelay);
      return () => clearTimeout(timeout);
    }

    const currentWord = items[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        
        if (displayedText.length === currentWord.length) {
          setIsPaused(true);
        }
      } else {
        // Deleting
        setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % items.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, isPaused, wordIndex, items, typeSpeed, deleteSpeed, pauseDelay, loop]);

  return (
    <span className={cn("inline-block", className)}>
      {displayedText}
    </span>
  );
}
