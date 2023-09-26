import { toSeconds, setTargetDate, setOutput, addZero } from "./util";

export const countdown = () => {
  // Get time stamp NOW and set variables
  const now = new Date(),
    now_day = now.getDay(),
    now_month = now.getMonth(),
    now_date = now.getDate(),
    now_year = now.getFullYear(),
    now_hour = now.getHours(),
    now_minute = now.getMinutes(),
    now_second = now.getSeconds(),
    target_date = setTargetDate(now_day, now_date),
    target_month = now_month,
    target_year = now_year,
    target_hour = 17,
    target_minute = 30,
    target_second = 0;

  //set start time
  const start_now = new Date(
    now_year,
    now_month,
    now_date,
    now_hour,
    now_minute,
    now_second
  );

  //set target time
  const start_target = new Date(
    target_year,
    target_month,
    target_date,
    target_hour,
    target_minute,
    target_second
  );

  //set differances for time frames
  const diff = toSeconds(start_target - start_now);
  const days = setOutput(diff, 86400);
  const hours = setOutput(diff, 3600) - days * 24;
  const minutes = setOutput(diff, 60) - (hours * 60 + days * 1440);
  const seconds =
    setOutput(diff, 1) - (minutes * 60 + hours * 3600 + days * 86400);

  //return final output
  return {
    days: addZero(days),
    hours: addZero(hours),
    minutes: addZero(minutes),
    seconds: addZero(seconds),
  };
};
