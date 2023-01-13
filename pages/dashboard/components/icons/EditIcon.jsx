const EditIcon = ({ fill, size, height, width, ...props }) => {
  return (
    <svg
      id="Iconly_Curved_Delete"
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 20 20"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g>
        <path
          id="Stroke_1"
          data-name="Stroke 1"
          d="M0,.5H6.377"
          transform="translate(9.835 15.508)"
          fill="none"
          stroke={fill}
        />
        <path
          id="Stroke_3"
          data-name="Stroke 3"
          d="M11.808.609h0a3.042,3.042,0,0,0-4.258.607l-6.752,9C-.941,12.529.7,15.4.7,15.4s3.244.746,4.958-1.539l6.752-8.995A3.042,3.042,0,0,0,11.808.609Z"
          transform="translate(0.75 0.75)"
          fill="none"
          stroke={fill}
        />
        <path
          id="Stroke_5"
          data-name="Stroke 5"
          d="M0,0,4.864,3.651"
          transform="translate(7.004 3.711)"
          fill="none"
          stroke={fill}
        />
      </g>
    </svg>
  );
};

export default EditIcon