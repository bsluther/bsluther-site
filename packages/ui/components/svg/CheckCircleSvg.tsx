import React from 'react'
export const CheckCircleSvg: React.FC<{ className?: string, strokeWidth?: number }>  = props =>
  <svg 
    fill="none"
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round" 
      strokeLinejoin="round" 
      // strokeWidth={props.strokeWidth ?? 2} 
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
    />
  </svg>