const ClockSquare = (props) => {
  return (
    <div
      className={`${
        "grid_" + props.position
      } rounded-md shadow-base-300 shadow-md transition`}
    >
      <div
        className={`h-full overflow-hidden rounded-md shadow-sm shadow-base-300 transition`}
      >
        <div
          className={`${
            "container_" + props.position
          } flex items-center justify-center text-center h-full`}
        >
          <span
            className={`${
              "digit_" + props.position
            }  mr-1.5 leading-none font-mono antialiased transition`}
          >
            {props.value}
          </span>
          <span
            className={`${
              "text_" + props.position
            } uppercase leading-none tracking-wide text-sans antialiased transition`}
          >
            {/* {props.count === "01" ? `second` : `seconds`} */}
            {props.tag}
          </span>
        </div>
      </div>
    </div>
  );
};

export { ClockSquare };
