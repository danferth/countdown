"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import useSettings from "../../components/useSettings";
import { DateTime } from "luxon";
export default function Settings() {
  const currentTime = DateTime.now();
  const router = useRouter();
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
  function onChangeDropdown(duration, event) {
    event.preventDefault();
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
    router.push("/");
  }
  const isDurationShown = `form-control ${
    isRepeatableInput ? "block" : "hidden"
  } transition`;
  const inputStyle = "input bg-base-300";
  return (
    <div className="w-full max-w-2xl px-2.5">
      <div className="prose mb-12">
        <h1 className="">Countdown Settings</h1>
        <p>
          Customie the countdown to any date and time up to twenty years from
          now. You can also set the coutdown to repeat weekly, monthly, yearly,
          or set a one-time countdown.
        </p>
      </div>

      {/* form content for page */}
      <div className="mx-auto w-full">
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
          <div className="form-control">
            <label className="label" htmlFor="destinationTime">{`What time on ${
              DateTime.fromISO(destinationDateInput).weekdayLong
            } is the countdown to?`}</label>

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
            >{`Should the countdown repeat?`}</label>

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
              <summary className="m-1 btn text-base-content ">{`Repeat Duration: ${repeatDurationInput}`}</summary>
              <ul className="p-2 shadow menu dropdown-content z-[1] rounded-box w-52 bg-base-300 text-base-content ">
                <li>
                  <button onClick={(e) => onChangeDropdown("weekly", e)}>
                    Weekly
                  </button>
                </li>
                <li>
                  <button onClick={(e) => onChangeDropdown("monthly", e)}>
                    Monthly
                  </button>
                </li>
                <li>
                  <button onClick={(e) => onChangeDropdown("yearly", e)}>
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
