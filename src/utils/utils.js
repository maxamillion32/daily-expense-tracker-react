export function formatCommentDate (dateString) {
  const date = new Date(dateString);
  const options = {
    day: `2-digit`,
    month: `short`,
    year: `numeric`
  };
  return date.toLocaleString(`ru-RU`, options);
};
