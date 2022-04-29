export function formatDay (dateString) {
  const date = new Date(dateString);
  const options = {
    day: "2-digit",
  };
  return date.toLocaleString("en-EN", options);
}

export function formatWeekday (dateString) {
  const date = new Date(dateString);
  const options = {
    weekday: "long",
  };
  return date.toLocaleString("en-EN", options);
}

export function formatMonthYear (dateString) {
  const date = new Date(dateString);
  const options = {
    month: "long",
    year: "numeric"
  };
  return date.toLocaleString("en-EN", options);
}

export function formatMonth (dateString) {
  const date = new Date(dateString);
  const options = {
    month: "long"
  };
  return date.toLocaleString("en-EN", options);
}

export function formatYear (dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric"
  };
  return date.toLocaleString("en-EN", options);
}

export function formatMonthShort (dateString) {
  const date = new Date(dateString);
  const options = {
    month: "short"
  };
  return date.toLocaleString("en-EN", options);
}

export const getMaxAmountPerYear = (year, type, transactions) => {
  const months = [...new Set(transactions
    .filter((transaction) => formatYear(transaction.date) === year)
    .map((transaction) => formatMonth(transaction.date)))];

  const amount = Math.max(...months
    .map((month) => transactions
    .map((transaction) => formatMonth(transaction.date) === month
      ? (type === "expenses" ? transaction.expense : !transaction.expense)
        ? transaction = +transaction.sum
        : transaction = null
      : null)
    .reduce((acc, sum) => acc + sum, 0)));

  return amount;
};

export const isEqual = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};
