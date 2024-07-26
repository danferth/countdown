"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import useSettings from "../../components/useSettings";
import { DateTime } from "luxon";
import Link from "next/link";
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
  function onChangeDropdown(duration) {
    setRepeatDurationInput(duration);
    // dropdownOpen.current.removeAttribute("open");
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
        <p className="prose prose-sm max-w-none">
          Creating an{" "}
          <Link href="/login" className="text-accent">
            account
          </Link>{" "}
          is optional but highly recommended for repeat visitors. By doing so,
          you can keep your countdown persistent between visits and enjoy more
          customization options.
        </p>
        {/* <p className="text-xs my-0 py-0">
          <span className="sm:hidden">base</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline 2xl:hidden">xl</span>
          <span className="hidden 2xl:inline">2xl</span>
        </p> */}
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
          <div className={`${formControlStyle} lg:col-span-2 lg:pt-12`}>
            <button
              className="mx-auto btn btn-lg btn-outline btn-accent w-full sm:max-w-xs lg:max-w-2xl"
              type="submit"
            >
              New Countdown
            </button>
          </div>
        </form>
        <div className="prose prose-sm max-w-none md:max-w-2xl md:mx-auto bg-base-200 text-base-content p-2.5 rounded-lg mb-24">
          <p>
            To save your settings for future visits, consider creating an{" "}
            <Link href="/login" className="text-accent">
              account
            </Link>
            . You can sign in with Google, GitHub, or a Magic Link. Rest
            assured, we won&apos;t send any unsolicited emails or solicitations.
          </p>
        </div>
      </div>
    </div>
  );
}
