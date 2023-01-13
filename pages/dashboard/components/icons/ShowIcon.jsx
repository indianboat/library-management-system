const ShowIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      id="Iconly_Curved_Show"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          id="Stroke_1"
          data-name="Stroke 1"
          d="M6.324,3.162A3.162,3.162,0,1,1,3.162,0,3.162,3.162,0,0,1,6.324,3.162Z"
          transform="translate(6.84 4.89)"
          fill="none"
          stroke={fill}
        />
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M0,7.3c0,3.28,4.142,7.3,9.252,7.3S18.5,10.585,18.5,7.3,14.361,0,9.252,0,0,4.022,0,7.3Z"
          transform="translate(0.75 0.75)"
          fill="none"
          stroke={fill}
        />
      </g>
    </svg>
  );
};

export default ShowIcon