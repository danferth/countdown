const Years = (props) => {
  return (
    <Wrap
      grid={`${props.count === 0 ? "hidden" : "block"} ${
        props.nextSibling === 0
          ? "col-span-2 sm:col-start-1 sm:col-span-4 xl:col-span-2 xl:col-start-1"
          : "col-span-1 sm:col-start-1 sm:col-span-2 xl:col-span-1 xl:col-start-1"
      }`}
    >
      <div className="flex justify-center flex-col items-center py-2.5 h-full">
        <span className="text-3xl">{props.children}</span>
        <span className="text-sm uppercase font-sans font-light leading-none tracking-wide">
          {props.count === "01" ? `year` : `years`}
        </span>
      </div>
    </Wrap>
  );
};

const Months = (props) => {
  return (
    <Wrap
      grid={`${props.count === 0 ? "hidden" : "block"} ${
        props.previousSibling === 0
          ? "col-span-2 sm:col-start-1 sm:col-span-4 xl:col-span-2 xl:col-start-1"
          : "col-span-1 sm:col-start-3 sm:col-span-2 xl:col-span-1 xl:col-start-2"
      }`}
    >
      <div className="flex justify-center flex-col items-center py-2.5 h-full">
        <span className="text-3xl">{props.children}</span>
        <span className="text-sm uppercase font-sans font-light leading-none tracking-wide">
          {props.count === "01" ? `month` : `months`}
        </span>
      </div>
    </Wrap>
  );
};

const Days = (props) => {
  return (
    <Wrap grid="col-span-2 sm:row-span-2 xl:row-span-1">
      <div className="flex items-center justify-center py-3 h-full">
        <span className="text-9xl">{props.children}</span>
        <span className="-ml-5 leading-none text-4xl text-center font-thin font-sans tracking-widest inline-block uppercase transform -rotate-90">
          {props.count === "01" ? `day` : `days`}
        </span>
      </div>
    </Wrap>
  );
};

const Hours = (props) => {
  return (
    <Wrap grid="col-span-2 sm:col-start-3 sm:col-span-2 xl:col-start-1">
      <div className="text-center leading-none flex items-center justify-center py-2 h-full">
        <span className="text-4xl">{props.children}</span>
        <span className="text-4xl uppercase font-sans font-black tracking-wide">
          {props.count === "01" ? `hour` : `hours`}
        </span>
      </div>
    </Wrap>
  );
};

const Minutes = (props) => {
  return (
    <Wrap grid="col-span-1 sm:col-start-3 sm:col-span-1 xl:col-start-1">
      <div className="flex justify-center flex-col items-center py-2.5 h-full">
        <span className="text-3xl">{props.children}</span>
        <span className="text-sm uppercase font-sans font-light leading-none tracking-wide">
          {props.count === "01" ? `minute` : `minutes`}
        </span>
      </div>
    </Wrap>
  );
};

const Seconds = (props) => {
  return (
    <Wrap grid="col-span-1 sm:col-start-4 sm:col-span-1 xl:col-start-2">
      <div className="flex justify-center flex-col items-center py-2.5 h-full">
        <span className="text-3xl">{props.children}</span>
        <span className="text-sm uppercase font-sans font-light leading-none tracking-wide">
          {props.count === "01" ? `second` : `seconds`}
        </span>
      </div>
    </Wrap>
  );
};

const Wrap = (props) => {
  return (
    <div className={`${props.grid} rounded-md shadow-md xl:shadow-lg`}>
      <div
        className={`h-full overflow-hidden rounded-md shadow-sm font-mono text-gray-300 bg-gray-100    transition`}
      >
        {props.children}
      </div>
    </div>
  );
};

export { Years, Months, Days, Hours, Minutes, Seconds };
