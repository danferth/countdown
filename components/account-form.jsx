"use client";
import { useCallback, useEffect, useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateTime } from "luxon";
import useSettings from "./useSettings";
export default function AccountForm({ session }) {
  const supabase = createClientComponentClient();
  const currentTime = DateTime.now();
  // useSettings state
  const setDestinationZustand = useSettings((state) => state.setDestination);
  const setIsRepeatZustand = useSettings((state) => state.setIsRepeat);
  const setRepeatDurationZustand = useSettings(
    (state) => state.setRepeatDuration
  );

  // form state
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("example");
  const [avatar_url, setAvatarUrl] = useState("blank");

  const [isRepeat, setIsRepeat] = useState(true);

  const [destinationDate, setDestinationDate] = useState(
    currentTime.plus({ weeks: 1 }).toISODate()
  );
  const [destinationTime, setDestinationTime] = useState(
    currentTime.toLocaleString(DateTime.TIME_24_SIMPLE)
  );
  const [repeatDuration, setRepeatDuration] = useState("weekly");

  const settingsForm = useRef();
  const dropdownOpen = useRef();

  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, avatar_url, is_repeat, repeat_duration, destination`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
        setIsRepeat(data.is_repeat === null ? true : data.is_repeat);
        setRepeatDuration(
          data.repeat_duration === null ? "weekly" : data.repeat_duration
        );
        setDestinationDate(DateTime.fromISO(data.destination).toISODate());
        setDestinationTime(
          DateTime.fromISO(data.destination).toLocaleString(
            DateTime.TIME_24_SIMPLE
          )
        );
        setIsRepeatZustand(data.is_repeat);
        setRepeatDurationZustand(data.repeat_duration);
        setDestinationZustand(DateTime.fromISO(data.destination));
      }
    } catch (error) {
      console.log("error", error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  useEffect(() => {
    console.log("isRepeat", isRepeat);
  }, [isRepeat]);

  async function updateProfile({
    username,
    avatar_url,
    is_repeat,
    repeat_duration,
    destination,
  }) {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        username: username,
        avatar_url: avatar_url,
        is_repeat: is_repeat,
        repeat_duration: repeat_duration,
        destination: destination,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      console.log("error Updateing", error);
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  function onChangeDropdown(duration) {
    setRepeatDuration(duration);
    dropdownOpen.current.removeAttribute("open");
  }

  function submitHandler(event) {
    event.preventDefault();
    const destination = `${destinationDate} ${destinationTime}`;
    updateProfile({
      username: username,
      avatar_url: avatar_url,
      is_repeat: isRepeat,
      repeat_duration: repeatDuration,
      destination: destination,
    }).then(() => {
      setIsRepeatZustand(isRepeat);
      setRepeatDurationZustand(repeatDuration);
      setDestinationZustand(
        DateTime.fromISO(`${destinationDate}T${destinationTime}`)
      );
    });
  }

  // styles
  const isDurationShown = `form-control ${
    isRepeat ? "block" : "hidden"
  } transition`;
  const inputStyle =
    "input bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400";

  return (
    <div className="bg-white p-8 rounded-md w-full lg:max-w-3xl mr-auto">
      <form
        ref={settingsForm}
        onSubmit={(e) => submitHandler(e)}
        className="w-full h-content space-y-8"
      >
        <div className="form-control">
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className={inputStyle}
            id="email"
            type="text"
            value={session?.user.email}
            disabled
          />
        </div>
        {/* username */}
        <div className="form-control">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className={inputStyle}
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
            value={destinationDate}
            min={currentTime.minus({ months: 3 }).toISODate()}
            max={currentTime.plus({ years: 20 }).toISODate()}
            onChange={(e) => setDestinationDate(e.target.value)}
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
            value={destinationTime}
            onChange={(e) => setDestinationTime(e.target.value)}
          />
        </div>
        {/* isreapeat toggle */}
        <div className="form-control">
          <label
            className="label"
            htmlFor="isRepeat"
          >{`should the countdown repeat?`}</label>

          <input
            className="input toggle"
            type="checkbox"
            id="isRepeat"
            name="isRepeat"
            checked={isRepeat}
            onChange={() => setIsRepeat(!isRepeat)}
          />
        </div>
        {/* repeatDuration */}
        <div className={isDurationShown}>
          <details ref={dropdownOpen} className="dropdown block">
            <summary className="m-1 btn bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400">{`Repeat Duration: ${repeatDuration}`}</summary>
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
          {loading ? "Loading ..." : "Update"}
        </button>
      </form>
      <div className="bg-yellow-300 p-8 rounded-md mt-8">
        <form action="/auth/signout" method="post">
          <button className="btn btn-sm btn-outline" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
