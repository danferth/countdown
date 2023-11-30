"use client";
import { useCallback, useEffect, useState, useReducer, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateTime } from "luxon";
import useSettings from "./useSettings";
import { useRouter } from "next/navigation";
import Avatar from "./Aavatar";
export default function AccountForm({ session }) {
  const supabase = createClientComponentClient();
  const currentTime = DateTime.now();
  const router = useRouter();
  const setDestinationZustand = useSettings((state) => state.setDestination);
  const setIsRepeatZustand = useSettings((state) => state.setIsRepeat);
  const setRepeatDurationZustand = useSettings(
    (state) => state.setRepeatDuration
  );

  const formReducer = (state, action) => {
    switch (action.type) {
      case "SET_USERNAME":
        return { ...state, username: action.payload };
      case "SET_FULL_NAME":
        return { ...state, full_name: action.payload };
      case "SET_AVATAR_URL":
        return { ...state, avatar_url: action.payload };
      case "SET_IS_REPEAT":
        return { ...state, isRepeat: action.payload };
      case "SET_DESTINATION_DATE":
        return { ...state, destinationDate: action.payload };
      case "SET_DESTINATION_TIME":
        return { ...state, destinationTime: action.payload };
      case "SET_REPEAT_DURATION":
        return { ...state, repeatDuration: action.payload };
      default:
        return state;
    }
  };

  const initialFormState = {
    username: "",
    full_name: "",
    avatar_url: "",
    isRepeat: true,
    destinationDate: currentTime.plus({ weeks: 1 }).toISODate(),
    destinationTime: currentTime.toLocaleString(DateTime.TIME_24_SIMPLE),
    repeatDuration: "weekly",
  };

  const [loading, setLoading] = useState(true);
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const {
    username,
    full_name,
    avatar_url,
    isRepeat,
    destinationDate,
    destinationTime,
    repeatDuration,
  } = formState;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  const user = session?.user;

  const updateProfile = async ({
    username,
    avatar_url,
    is_repeat,
    repeat_duration,
    destination,
  }) => {
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
    } catch (error) {
      console.log("error Updateing", error);
    } finally {
      router.push("/");
    }
  };

  const getProfile = useCallback(async (supabase, user) => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(
          `username, full_name, avatar_url, is_repeat, repeat_duration, destination`
        )
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        dispatch({ type: "SET_USERNAME", payload: data.username });
        dispatch({ type: "SET_FULL_NAME", payload: data.full_name });
        dispatch({ type: "SET_AVATAR_URL", payload: data.avatar_url });
        dispatch({
          type: "SET_IS_REPEAT",
          payload: data.is_repeat === null ? true : data.is_repeat,
        });
        dispatch({
          type: "SET_REPEAT_DURATION",
          payload:
            data.repeat_duration === null ? "weekly" : data.repeat_duration,
        });
        dispatch({
          type: "SET_DESTINATION_DATE",
          payload: DateTime.fromISO(data.destination).toISODate(),
        });
        dispatch({
          type: "SET_DESTINATION_TIME",
          payload: DateTime.fromISO(data.destination).toLocaleString(
            DateTime.TIME_24_SIMPLE
          ),
        });
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
  }, []);

  useEffect(() => {
    const supabase = createClientComponentClient();
    getProfile(supabase, user);
  }, [session]);

  const submitHandler = (event) => {
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
  };

  const isDurationShown = `form-control ${
    isRepeat ? "block" : "hidden"
  } transition`;
  const inputStyle =
    "input bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-400";
  const dropdownOpen = useRef();

  function onChangeDropdown(duration) {
    dispatch({ type: "SET_REPEAT_DURATION", payload: duration });
    dropdownOpen.current.removeAttribute("open");
  }

  return (
    <div className="bg-white p-8 rounded-md w-full lg:max-w-3xl mr-auto">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="w-full h-content space-y-8"
      >
        <div className="form-control">
          <Avatar
            uid={user.id}
            url={avatar_url}
            size={150}
            onUpload={(url) =>
              dispatch({ type: "SET_AVATAR_URL", payload: url })
            }
          />
        </div>
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
        <div className="form-control">
          <label className="label" htmlFor="full_name">
            Full Name
          </label>
          <input
            className={inputStyle}
            id="full_name"
            type="text"
            value={full_name || ""}
            onChange={(e) =>
              dispatch({ type: "SET_FULL_NAME", payload: e.target.value })
            }
          />
        </div>
        <div className="form-control">
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className={inputStyle}
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) =>
              dispatch({ type: "SET_USERNAME", payload: e.target.value })
            }
          />
        </div>
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
            onChange={(e) =>
              dispatch({
                type: "SET_DESTINATION_DATE",
                payload: e.target.value,
              })
            }
          />
        </div>
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
            onChange={(e) =>
              dispatch({
                type: "SET_DESTINATION_TIME",
                payload: e.target.value,
              })
            }
          />
        </div>
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
            onChange={() =>
              dispatch({ type: "SET_IS_REPEAT", payload: !isRepeat })
            }
          />
        </div>
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
        <button className="btn btn-sm btn-outline" type="submit">
          {loading ? "Loading ..." : "Update"}
        </button>
      </form>
    </div>
  );
}
