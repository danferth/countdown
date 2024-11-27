"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import useSettings from "../../components/useSettings";
import useTheme from "../../components/useTheme";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";
import Link from "next/link";
export default function Settings() {
  // useTheme
  const Light = useTheme((state) => state.Light);
  const Dark = useTheme((state) => state.Dark);
  const setLight = useTheme((state) => state.setLight);
  const setDark = useTheme((state) => state.setDark);

  const currentTime = DateTime.now();
  const router = useRouter();
  // useSetings
  const destination = useSettings((state) => state.destination);
  const setDestination = useSettings((state) => state.setDestination);

  const isRepeat = useSettings((state) => state.isRepeat);
  const setIsRepeat = useSettings((state) => state.setIsRepeat);

  const repeatDuration = useSettings((state) => state.repeatDuration);
  const setRepeatDuration = useSettings((state) => state.setRepeatDuration);
  // form state
  const [isRepeatableInput, setIsRepeatableInput] = useState(isRepeat);
  const [destinationDateInput, setDestinationDateInput] = useState(
    destination.toISODate()
  );
  const [destinationTimeInput, setDestinationTimeInput] = useState(
    destination.toLocaleString(DateTime.TIME_24_SIMPLE)
  );
  const [repeatDurationInput, setRepeatDurationInput] =
    useState(repeatDuration);
  const settingsForm = useRef();
  function onChangeDropdown(duration) {
    setRepeatDurationInput(duration);
  }
  function onChangeThemeLight(event, lightTheme) {
    event.preventDefault();
    setLight(lightTheme);
  }
  function onChangeThemeDark(event, darkTheme) {
    event.preventDefault();
    setDark(darkTheme);
  }
  function submitHandler(event) {
    event.preventDefault();
    setIsRepeat(isRepeatableInput);
    setRepeatDuration(repeatDurationInput);
    setDestination(
      DateTime.fromISO(`${destinationDateInput}T${destinationTimeInput}`)
    );

    router.push("/");
  }

  const controlWrapperStyle = "space-y-6 flex flex-col justify-between";
  const formControlStyle = "form-control items-center justify-center";
  const inputStyle =
    "input input-primary w-full sm:max-w-xs input-lg text-center";
  const labelStyle = "label text-lg font-bold";
  const toggleStyle = "toggle toggle-secondary toggle-lg lg:mt-4";
  const selectStyle = "select w-full sm:max-w-xs select-lg select-secondary";
  return (
    <div className="mt-8 w-full max-w-3xl px-2.5 mx-auto">
      <div className="prose prose-xl lg:prose-lg mb-12 max-w-none">
        <h1 className="sm:text-center">Countdown Settings</h1>
        <p>
          Make the countdown personal by setting to any date and time up to
          twenty years from now. You can also set the coutdown to repeat weekly,
          monthly, yearly, or set a one-time countdown.
        </p>
        <p className="text-xs my-0 py-0">
          <span className="sm:hidden">base</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline 2xl:hidden">xl</span>
          <span className="hidden 2xl:inline">2xl</span>
        </p>
      </div>

      {/* form content for page */}
      <div className="mx-auto w-full">
        <form
          ref={settingsForm}
          onSubmit={(e) => submitHandler(e)}
          className="w-full h-full space-y-12 mb-12 lg:grid lg:grid-cols-2 lg:space-y-0"
        >
          <div className={controlWrapperStyle}>
            {/* datepicker */}
            <div className={formControlStyle}>
              <label
                className={labelStyle}
                htmlFor="destinationDate"
              >{`Countdown to what day?`}</label>

              <input
                className={inputStyle}
                type="date"
                id="destinationDate"
                name="destinationDate"
                value={destinationDateInput}
                min={currentTime.toISODate()}
                max={currentTime.plus({ years: 20 }).toISODate()}
                onChange={(e) => setDestinationDateInput(e.target.value)}
              />
            </div>

            {/* Time portion */}
            <div className={formControlStyle}>
              <label
                className={labelStyle}
                htmlFor="destinationTime"
              >{`What time on ${
                DateTime.fromISO(destinationDateInput).weekdayLong
              }?`}</label>

              <input
                className={inputStyle}
                type="time"
                id="destinationTime"
                name="destinationTime"
                value={destinationTimeInput}
                onChange={(e) => setDestinationTimeInput(e.target.value)}
              />
            </div>
          </div>
          <div className={controlWrapperStyle}>
            {/* isreapeat toggle */}
            <div className={formControlStyle}>
              <label
                className={`${labelStyle} cursor-pointer`}
                htmlFor="isRepeatableInput"
              >{`Should it repeat?`}</label>

              <input
                className={`${toggleStyle} `}
                type="checkbox"
                id="isRepeatableInput"
                name="isRepeatableInput"
                checked={isRepeatableInput}
                onChange={() => setIsRepeatableInput(!isRepeatableInput)}
              />
            </div>
            {/* repeatDuration */}
            <div className={formControlStyle}>
              <label
                className={labelStyle}
                htmlFor="repeatDurationInput"
              >{`How often should it repeat?`}</label>
              <select
                name="repeatDurationInput"
                id="repeatDurationInput"
                disabled={!isRepeatableInput}
                onChange={(e) => onChangeDropdown(e.target.value)}
                className={selectStyle}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="space-y-6 flex justify-between w-full col-span-1 lg:col-span-2">
            {/* lightTheme */}
            <div className="w-full lg:grid lg:grid-cols-2 space-y-4 lg:space-y-0">
              <h2 className="lg:col-span-2 mt-6 lg:mb-4 text-center w-full text-lg font-bold">
                Set Light & Dark Themes
              </h2>

              <ThemeExampleWrapper
                title="Light Theme"
                themeSetting={Light}
                currentTheme={Light}
              >
                <ThemeExample
                  theme="light"
                  onClick={(event) => onChangeThemeLight(event, "light")}
                />
                <ThemeExample
                  theme="cupcake"
                  onClick={(event) => onChangeThemeLight(event, "cupcake")}
                />
                <ThemeExample
                  theme="bumblebee"
                  onClick={(event) => onChangeThemeLight(event, "bumblebee")}
                />
                <ThemeExample
                  theme="emerald"
                  onClick={(event) => onChangeThemeLight(event, "emerald")}
                />
                <ThemeExample
                  theme="corporate"
                  onClick={(event) => onChangeThemeLight(event, "corporate")}
                />
                <ThemeExample
                  theme="retro"
                  onClick={(event) => onChangeThemeLight(event, "retro")}
                />
                <ThemeExample
                  theme="cyberpunk"
                  onClick={(event) => onChangeThemeLight(event, "cyberpunk")}
                />
                <ThemeExample
                  theme="valentine"
                  onClick={(event) => onChangeThemeLight(event, "valentine")}
                />
                <ThemeExample
                  theme="garden"
                  onClick={(event) => onChangeThemeLight(event, "garden")}
                />
                <ThemeExample
                  theme="lofi"
                  onClick={(event) => onChangeThemeLight(event, "lofi")}
                />
                <ThemeExample
                  theme="pastel"
                  onClick={(event) => onChangeThemeLight(event, "pastel")}
                />
                <ThemeExample
                  theme="fantasy"
                  onClick={(event) => onChangeThemeLight(event, "fantasy")}
                />
                <ThemeExample
                  theme="wireframe"
                  onClick={(event) => onChangeThemeLight(event, "wireframe")}
                />
                <ThemeExample
                  theme="cmyk"
                  onClick={(event) => onChangeThemeLight(event, "cmyk")}
                />
                <ThemeExample
                  theme="autumn"
                  onClick={(event) => onChangeThemeLight(event, "autumn")}
                />
                <ThemeExample
                  theme="acid"
                  onClick={(event) => onChangeThemeLight(event, "acid")}
                />
                <ThemeExample
                  theme="lemonade"
                  onClick={(event) => onChangeThemeLight(event, "lemonade")}
                />
                <ThemeExample
                  theme="winter"
                  onClick={(event) => onChangeThemeLight(event, "winter")}
                />
                <ThemeExample
                  theme="nord"
                  onClick={(event) => onChangeThemeLight(event, "nord")}
                />
              </ThemeExampleWrapper>
              {/* darkTheme */}
              <ThemeExampleWrapper
                title="Dark Theme"
                themeSetting={Dark}
                currentTheme={Dark}
              >
                <ThemeExample
                  theme="dark"
                  onClick={(event) => onChangeThemeDark(event, "dark")}
                />
                <ThemeExample
                  theme="synthwave"
                  onClick={(event) => onChangeThemeDark(event, "synthwave")}
                />
                <ThemeExample
                  theme="halloween"
                  onClick={(event) => onChangeThemeDark(event, "halloween")}
                />
                <ThemeExample
                  theme="forest"
                  onClick={(event) => onChangeThemeDark(event, "forest")}
                />
                <ThemeExample
                  theme="aqua"
                  onClick={(event) => onChangeThemeDark(event, "aqua")}
                />
                <ThemeExample
                  theme="black"
                  onClick={(event) => onChangeThemeDark(event, "black")}
                />
                <ThemeExample
                  theme="luxury"
                  onClick={(event) => onChangeThemeDark(event, "luxury")}
                />
                <ThemeExample
                  theme="dracula"
                  onClick={(event) => onChangeThemeDark(event, "dracula")}
                />
                <ThemeExample
                  theme="business"
                  onClick={(event) => onChangeThemeDark(event, "business")}
                />
                <ThemeExample
                  theme="night"
                  onClick={(event) => onChangeThemeDark(event, "night")}
                />
                <ThemeExample
                  theme="coffee"
                  onClick={(event) => onChangeThemeDark(event, "coffee")}
                />
                <ThemeExample
                  theme="dim"
                  onClick={(event) => onChangeThemeDark(event, "dim")}
                />
                <ThemeExample
                  theme="sunset"
                  onClick={(event) => onChangeThemeDark(event, "sunset")}
                />
              </ThemeExampleWrapper>
            </div>
          </div>
          {/* add theme stuff. Light/dark/system, and choose light and dark theme. */}
          <div className={`${formControlStyle} lg:col-span-2 lg:pt-12`}>
            <button
              className="mx-auto btn btn-lg btn-outline btn-accent w-full sm:max-w-xs lg:max-w-2xl"
              type="submit"
            >
              New Countdown
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// dropdown for theme

const ThemeExample = (props) => {
  return (
    <li className="w-full">
      <button className="block" onClick={props.onClick}>
        <div
          className="bg-base-100 rounded-btn text-base-content cursor-pointer font-sans"
          data-theme={props.theme}
        >
          <div className="grid grid-cols-5 grid-rows-3">
            <div className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="invisible h-3 w-3 shrink-0"
              >
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
              </svg>{" "}
              <div className="flex-grow text-sm">
                {props.theme.charAt(0).toUpperCase() + props.theme.slice(1)}
              </div>{" "}
              <div className="flex h-full shrink-0 flex-wrap gap-1">
                <div className="bg-primary rounded-badge w-2"></div>{" "}
                <div className="bg-secondary rounded-badge w-2"></div>{" "}
                <div className="bg-accent rounded-badge w-2"></div>{" "}
                <div className="bg-neutral rounded-badge w-2"></div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

const ThemeExampleWrapper = (props) => {
  return (
    <div className="dropdown dropdown-end dropdown-bottom flex lg:inline-flex">
      <div
        tabIndex={0}
        role="button"
        data-theme={props.themeSetting}
        className="btn w-full sm:max-w-xs btn-lg btn-primary m-auto"
      >
        {`${props.title} (${props.currentTheme})`}
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content bg-base-200 rounded-box z-[1] w-full p-2 shadow"
      >
        {props.children}
      </ul>
    </div>
  );
};
