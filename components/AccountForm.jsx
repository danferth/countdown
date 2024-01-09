"use client";
import { useEffect, useState, useReducer, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateTime } from "luxon";
import useSettings from "./useSettings";
import getProfile from "../components/getProfile";
import { useRouter } from "next/navigation";
import updateUser from "../components/updateUser";

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
      // case "SET_AVATAR_URL":
      //   return { ...state, avatar_url: action.payload };
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
  // const [dispalyedAvatar, setDisplayedAvatar] = useState("");
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const {
    username,
    full_name,
    isRepeat,
    destinationDate,
    destinationTime,
    repeatDuration,
  } = formState;

  const user = session?.user;

  useEffect(() => {
    async function fetchProfile(user) {
      try {
        setLoading(true);
        const profile = await getProfile(user);

        // if (profile.avatar_url) {
        //   const avatarUrl = await getAvatar(profile.avatar_url);
        //   setDisplayedAvatar(avatarUrl);
        // }
        if (profile) {
          dispatch({ type: "SET_USERNAME", payload: profile.username });
          dispatch({ type: "SET_FULL_NAME", payload: profile.full_name });
          dispatch({ type: "SET_AVATAR_URL", payload: profile.avatar_url });
          dispatch({
            type: "SET_IS_REPEAT",
            payload: profile.is_repeat === null ? true : profile.is_repeat,
          });
          dispatch({
            type: "SET_REPEAT_DURATION",
            payload:
              profile.repeat_duration === null
                ? "weekly"
                : profile.repeat_duration,
          });
          dispatch({
            type: "SET_DESTINATION_DATE",
            payload: DateTime.fromISO(profile.destination).toISODate(),
          });
          dispatch({
            type: "SET_DESTINATION_TIME",
            payload: DateTime.fromISO(profile.destination).toLocaleString(
              DateTime.TIME_24_SIMPLE
            ),
          });
          setIsRepeatZustand(profile.is_repeat);
          setRepeatDurationZustand(profile.repeat_duration);
          setDestinationZustand(DateTime.fromISO(profile.destination));
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile(user);
  }, [
    setDestinationZustand,
    setIsRepeatZustand,
    setRepeatDurationZustand,
    user,
  ]);

  // upload avatar to storage
  // const uploadAvatar = async (event) => {
  //   try {
  //     if (!event.target.files || event.target.files.length === 0) {
  //       throw new Error("You must select an image to upload.");
  //     }
  //     const file = event.target.files[0];
  //     const fileExt = file.name.split(".").pop();
  //     const filePath = `${user.id}-${Math.random()}.${fileExt}`;
  //     const { error: uploadError } = await supabase.storage
  //       .from("avatars")
  //       .upload(filePath, file);
  //     if (uploadError) {
  //       throw uploadError;
  //     }
  //     // // this is the function that was passed to Avatar to upload new file path to user profile after fiel was uploaded
  //     dispatch({ type: "SET_AVATAR_URL", payload: filePath });
  //     setDisplayedAvatar(URL.createObjectURL(file));
  //   } catch (error) {
  //     console.log("avatar upload error", error);
  //     alert("Error uploading avatar!");
  //   }
  // };
  const submitHandler = (event) => {
    event.preventDefault();
    const destination = `${destinationDate} ${destinationTime}`;
    updateUser(session, {
      username: username,
      full_name: full_name,
      avatar_url: avatar_url,
      is_repeat: isRepeat,
      repeat_duration: repeatDuration,
      destination: destination,
    })
      .then(() => {
        setIsRepeatZustand(isRepeat);
        setRepeatDurationZustand(repeatDuration);
        setDestinationZustand(
          DateTime.fromISO(`${destinationDate}T${destinationTime}`)
        );
      })
      .then(() => {
        router.push("/");
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

  const deleteUser = async (id) => {
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
      console.log("delete user error", error);
    }
    if (data) {
      console.log("delete user success", data);
    }
    // const { error } = await supabase.from("profiles").delete().eq("id", id);
  };

  return (
    <div className="bg-white p-8 rounded-md w-full lg:max-w-3xl mr-auto">
      <form
        onSubmit={(e) => submitHandler(e)}
        className="w-full h-content space-y-8"
      >
        {/* <div className="form-control">
              {dispalyedAvatar ? (
                <Image
                  width={150}
                  height={150}
                  src={dispalyedAvatar}
                  alt="Avatar"
                  className="rounded-full"
                />
              ) : (
                <div className="skeleton" style={{ height: 150, width: 150 }} />
              )}
              <div style={{ width: 150 }}>
                <label className="label" htmlFor="avatar">
                  {loading ? "Uploading ..." : "Upload"}
                </label>
                <input
                  className="input"
                  name="avatar"
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={(event) => uploadAvatar(event)}
                  disabled={loading}
                />
              </div>
            </div> */}
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
      <div className="">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => deleteUser(user.id)}
        >
          Delete Acount
        </button>
      </div>
    </div>
  );
}
