import * as React from "react";
const DownArrow = ({ classname, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={5}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m.5.5 4 4 4-4"
    />
  </svg>
);
export default DownArrow;
