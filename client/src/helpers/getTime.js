import moment from "moment";
import "moment/locale/es";
import { DateTime, Settings } from "luxon";
Settings.defaultLocale = "es";

export const formatDateToForm = (dateData) => {
  const date = new Date(dateData);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

moment.updateLocale("es", {
  relativeTime: {
    future: "en %s",
    past: "%s",
    s: "%ds",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "%dd",
    dd: "%dd",
    M: "un mes",
    MM: "%dm",
    y: "un año",
    yy: "%da",
  },
});

export const getTime = (date) => { // Hace 2 horas
  return moment(date).fromNow();
};

export const getDateWithHour = (dt) => {
  let date = DateTime.fromISO(dt);
  return date.toFormat("dd LLL yyyy, HH:mm");
};

export const getHour = (dt) => { // 12:00
  let date = DateTime.fromISO(dt);
  date = date.toFormat("HH:mm")
  return date;
};
export const getDateMonth = (dt) => { // Nov. 2024
  let date = DateTime.fromISO(dt);
  return date.toFormat("LLL. yyyy");
};

export const getFullDateOrTime = (dt) => { // 12 de nov de 2024 o Hace 2 horas si es de esta semana
  let date = DateTime.fromISO(dt);
  const currentYear = DateTime.now().year;
  const startOfWeek = DateTime.now().startOf('week');

  if (date >= startOfWeek) {
    return getTime(dt);
  }

  if (date.year === currentYear) {
    return date.toFormat("dd LLL");
  }

  return date.toFormat("dd LLL yyyy");
};
export const getFullDate = (dt) => { // 12 de nov de 2024
  let date = DateTime.fromISO(dt);
  const currentYear = DateTime.now().year;
  if (date.year === currentYear) {
    return date.toFormat("dd LLL");
  }
  return date.toFormat("dd LLL yyyy");
};

export const getYear = (dt) => { // 2024
  let date = DateTime.fromISO(dt);
  return date.toFormat("yyyy");
};

export const getTimeQuantity = (startDate, endDate) => { // 2 años y 3 meses
  console.log('endDate', endDate)
  let start = DateTime.fromISO(startDate);
  endDate = endDate ? endDate : DateTime.now().toISODate();
  let end = DateTime.fromISO(endDate);
  let diff = end.diff(start, ["years", "months", "days"]);
  let years = diff.years;
  let months = diff.months;
  let result = "";

  switch (true) {
    case years > 0 && months > 0:
      result = years + " años y " + months + " meses";
      break;
    case years > 0:
      result = years + " años";
      break;
    case months > 0:
      result = months + " meses";
      break;
    default:
      result = "menos de un mes";
  }
  return result;
};
