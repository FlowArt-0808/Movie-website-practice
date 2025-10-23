import * as React from "react";

const RightArrow = ({ className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={5}
    height={9}
    fill="none"
    className={className}
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m.5 8.5 4-4-4-4"
    />
  </svg>
);

export default RightArrow;
