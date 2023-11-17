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
  return (
    <div>
      <div className="prose mb-12">
        <h1 className="text-gray-700 dark:text-gray-200">Settings page</h1>
      </div>

      {/* form content for page */}
      <div className="bg-white p-8 rounded-md max-w-3xl mx-auto">
        <form ref={settingsForm} onSubmit={(e) => submitHandler(e)}>
          {/* datepicker */}
          <label
            className="block"
            htmlFor="destinationDate"
          >{`destination date: ${destination.toISODate()}`}</label>

          <input
            className="block border border-gray-400"
            type="date"
            id="destinationDate"
            name="destinationDate"
            value={destinationDateInput}
            min={destination.minus({ months: 3 }).toISODate()}
            max={destination.plus({ years: 20 }).toISODate()}
            onChange={(e) => setDestinationDateInput(e.target.value)}
          />

          {/* Time portion */}
          <label
            className="block"
            htmlFor="destinationTime"
          >{`destination time: ${destination.toISOTime()}`}</label>

          <input
            className="block border border-gray-400"
            type="time"
            id="destinationTime"
            name="destinationTime"
            value={destinationTimeInput}
            onChange={(e) => setDestinationTimeInput(e.target.value)}
          />
          {/* isreapeat toggle */}
          <label
            className="block"
            htmlFor="isRepeatableInput"
          >{`Repeatable countdown: ${isRepeatableInput ? "Yes" : "No"}`}</label>

          <input
            className="block toggle border border-gray-400"
            type="checkbox"
            id="isRepeatableInput"
            name="isRepeatableInput"
            checked={isRepeatableInput}
            onChange={() => setIsRepeatableInput(!isRepeatableInput)}
          />
          {/* repeatDuration */}
          <details ref={dropdownOpen} className="dropdown block">
            <summary className="m-1 btn">{`Repeat Duration: ${repeatDurationInput}`}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
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
          {/* submit */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
