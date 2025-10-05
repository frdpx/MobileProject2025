export const formatDate = (iso) => {
  const date = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const this_month = new Date().getMonth();
export const this_year = new Date().getFullYear();

export const filterTransactionsByMonth = (
  transactions,
  month = new Date().getUTCMonth(),
  year = new Date().getUTCFullYear()
) => {
  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getUTCMonth() === month && d.getUTCFullYear() === year;
  });
};
