// function to to fool day and month (01, 02...)

// convert string to date
export function convertStringToDate(data) {
  const [day, month, year] = data?.split('.');
  const dateObject = new Date(year, month - 1, day);
  return dateObject;
}

// Date converting to string
function getFull(date) {
  return date < 10 ? '0' + date : date;
}

export function convertDateToString(value) {
  return `${getFull(value.getDate())}.${getFull(
    value.getMonth() + 1
  )}.${value.getFullYear()}`;
}
