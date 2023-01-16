export const CategoryIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      id="category_icon"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(3 3)">
        <path
          id="Stroke_1"
          data-name="Stroke 1"
          d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.674,3.674,0,0,1,7.347,3.674Z"
          transform="translate(10.654 0)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        />
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.674,3.674,0,0,1,7.347,3.674Z"
          transform="translate(0 0)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        />
        <path
          id="Stroke_5"
          data-name="Stroke 5"
          d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.674,3.674,0,0,1,7.347,3.674Z"
          transform="translate(10.654 10.588)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        />
        <path
          id="Stroke_7"
          data-name="Stroke 7"
          d="M7.347,3.674A3.673,3.673,0,1,1,3.673,0,3.673,3.673,0,0,1,7.347,3.674Z"
          transform="translate(0 10.588)"
          fill="none"
          stroke={fill}
          strokeWidth="1.5"
        />
      </g>
    </svg>
  );
};
