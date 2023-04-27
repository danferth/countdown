//human readable day of the week
export const printToday = () => {
  const date = new Date();
  const day = date.getDay();
  let today = "";
  switch (day) {
    case 0:
      today = "Sunday";
      break;
    case 1:
      today = "Monday";
      break;
    case 2:
      today = "Tuesday";
      break;
    case 3:
      today = "Wednesday";
      break;
    case 4:
      today = "Thursday";
      break;
    case 5:
      today = "Friday";
      break;
    case 6:
      today = "Saturday";
      break;
    default:
      break;
  }

  return today;
};

//fn: set target date
export const setTargetDate = (day, date) => {
  switch (day) {
    case 0:
      return date + 5;
    case 1:
      return date + 4;
    case 2:
      return date + 3;
    case 3:
      return date + 2;
    case 4:
      return date + 1;
    case 5:
      return date + 0;
    case 6:
      return date + 6;
    default:
      console.error(`error with now variable: ${day}`);
      break;
  }
};

// fn: ms to seconds
export const toSeconds = (ms) =>
  ms % 1000 === 0 ? ms / 1000 : ms - (ms % 1000) / 1000;

//fn: how many 'count' are in 'sec' minus remainders
export const setOutput = (sec, count) =>
  sec % count === 0 ? sec / count : (sec - (sec % count)) / count;

//fn: prepend '0' if single digit
export const addZero = (n) =>
  n.toString().length === 1 ? `0${n.toString()}` : n;
