export const XSvg = props =>
  <svg 
    {...props} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={props.strokeWidth ?? 2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>