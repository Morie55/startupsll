// utils/formatDate.js

export function formatDate(dateInput: any) {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
