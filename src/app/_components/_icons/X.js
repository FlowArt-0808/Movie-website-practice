import * as React from "react"
const X = ({className, ...props}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={9}
    fill="none"
    className={className}
    {...props}
  >
    <path
      stroke="#E4E4E7"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8.5.5-8 8m0-8 8 8"
    />
  </svg>
)
export default X
