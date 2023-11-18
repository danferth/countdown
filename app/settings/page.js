"use client";
import { useState, useRef } from "react";
import useSettings from "../../components/useSettings";
import { DateTime } from "luxon";
export default function Settings() {
  const currentTime = DateTime.now();

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
  const dropdownOpen = useRef();
  function onChangeDropdown(duration) {
    setRepeatDurationInput(duration);
    dropdownOpen.current.removeAttribute("open");
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsRepeat(isRepeatableInput);
    setRepeatDuration(repeatDurationInput);
    setDestination(
      DateTime.fromISO(`${destinationDateInput}T${destinationTimeInput}`)
    );
  }
  const isDurationShown = `form-control ${
    isRepeatableInput ? "block" : "hidden"
  } transition`;
  const inputStyle =
    "input bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400";
  return (
    <div className="w-full">
      <div className="prose mb-12">
        <h1 className="text-gray-700 dark:text-gray-200">Settings page</h1>
      </div>

      {/* form content for page */}
      <div className="bg-white p-8 rounded-md max-w-xl mr-auto">
        <form
          ref={settingsForm}
          onSubmit={(e) => submitHandler(e)}
          className="w-full h-full space-y-8"
        >
          {/* datepicker */}
          <div className="form-control">
            <label
              className="label"
              htmlFor="destinationDate"
            >{`set a new destination date`}</label>

            <input
              className={inputStyle}
              type="date"
              id="destinationDate"
              name="destinationDate"
              value={destinationDateInput}
              min={destination.minus({ months: 3 }).toISODate()}
              max={destination.plus({ years: 20 }).toISODate()}
              onChange={(e) => setDestinationDateInput(e.target.value)}
            />
          </div>

          {/* Time portion */}
          <div className="form-control">
            <label
              className="label"
              htmlFor="destinationTime"
            >{`set a new destination time or keep the default`}</label>

            <input
              className={inputStyle}
              type="time"
              id="destinationTime"
              name="destinationTime"
              value={destinationTimeInput}
              onChange={(e) => setDestinationTimeInput(e.target.value)}
            />
          </div>
          {/* isreapeat toggle */}
          <div className="form-control">
            <label
              className="label"
              htmlFor="isRepeatableInput"
            >{`should the countdown repeat?`}</label>

            <input
              className="input toggle"
              type="checkbox"
              id="isRepeatableInput"
              name="isRepeatableInput"
              checked={isRepeatableInput}
              onChange={() => setIsRepeatableInput(!isRepeatableInput)}
            />
          </div>
          {/* repeatDuration */}
          <div className={isDurationShown}>
            <details ref={dropdownOpen} className="dropdown block">
              <summary className="m-1 btn bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400">{`Repeat Duration: ${repeatDurationInput}`}</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-52 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                <li>
                  <button onClick={() => onChangeDropdown("weekly")}>
                    Weekly
                  </button>
                </li>
                <li>
                  <button onClick={() => onChangeDropdown("monthly")}>
                    Monthly
                  </button>
                </li>
                <li>
                  <button onClick={() => onChangeDropdown("yearly")}>
                    Yearly
                  </button>
                </li>
              </ul>
            </details>
          </div>
          {/* submit */}
          <button className="btn btn-sm btn-outline" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
