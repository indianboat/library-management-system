import React from "react";

const ChevronDownIcon = ({fill, size, width = 16, height = 16, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19 8.5L12 15.5L5 8.5"
        stroke="#000"
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeMiterlimit={10}
        strokeWidth={0.9}
      />
    </svg>
  );
};

export const icons = { chevron: <ChevronDownIcon fill="currentColor" size={16} /> }