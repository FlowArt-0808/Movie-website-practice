import * as React from "react"
const SeeMoreRightArrow = ({className,...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    fill="none"
    {...props}
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M.5 5.167h9.333m0 0L5.167.5m4.666 4.667L5.167 9.833"
    />
  </svg>
)
export default SeeMoreRightArrow
