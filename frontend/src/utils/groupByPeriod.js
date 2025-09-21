export const groupByPeriod = (transactions, period, month, year) => {
  const now = new Date();

  return transactions.filter((t) => {
    const date = new Date(t.date);

    // filter ตามเดือน/ปีที่เลือก
    if (date.getMonth() !== month || date.getFullYear() !== year) {
      return false;
    }

    if (period === "day") {
      return date.getDate() === now.getDate();
    }

    if (period === "week") {
      const diffTime = now - date;
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays < 7;
    }

    if (period === "month") {
      return true; // ผ่านเพราะ filter เดือน/ปีไปแล้ว
    }

    return false;
  });
};
