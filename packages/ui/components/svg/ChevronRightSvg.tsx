export const ChevronRightSvg = (props: JSX.IntrinsicElements['svg']) =>
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
      strokeWidth={props.strokeWidth ?? 2} 
      d="M9 5l7 7-7 7" 
    />
  </svg>