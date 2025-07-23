import React from 'react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  text?: string;
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ text = 'Loading...', className }) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full py-20 ${className}`}>
      <motion.img
        src="/pine-icon.svg"
        alt="Loading..."
        className="w-12 h-12"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <p className="text-gray-500 mt-4">{text}</p>
    </div>
  );
};

export default LoadingIndicator; 