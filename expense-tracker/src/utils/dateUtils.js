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

//แปลง ISO เป็นวันที่แบบไม่เปลี่ยนตาม time zone (ค.ศ.)
export const revertFormatDate = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
