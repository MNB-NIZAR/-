
import React, { useState, useEffect } from 'react';

interface HackerTextProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const HackerText: React.FC<HackerTextProps> = ({ text, onClick, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*0123456789";

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("")
          .map((char, index) => {
            if (index < iterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <div 
      className={`glitch cursor-pointer transition-all duration-300 ${className} ${isHovered ? 'scale-110' : ''}`}
      data-text={displayText}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {displayText}
    </div>
  );
};

export default HackerText;
