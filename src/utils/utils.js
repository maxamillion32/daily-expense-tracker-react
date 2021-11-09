export function formatDay (dateString) {
  const date = new Date(dateString);
  const options = {
    day: `2-digit`,
  };
  return date.toLocaleString(`en-EN`, options);
};

export function formatWeekday (dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: `long`,
  };
  return date.toLocaleString(`en-EN`, options);
};

export function formatMonth (dateString) {
  const date = new Date(dateString);
  const options = {
    month: `long`,
    year: `numeric`
  };
  return date.toLocaleString(`en-EN`, options);
};
