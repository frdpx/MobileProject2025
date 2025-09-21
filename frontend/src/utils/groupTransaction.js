import { categoryColors } from "../constants/colors";
import { categoryIcons, defaultIcon } from "../constants/icons";
import { filterTransactionsByMonth } from "./dateUtils";

export const groupTransactionByCategory = (transactions, tab, month, year) => {
  const currentMonthTsx = filterTransactionsByMonth(transactions, month, year);
  if (tab === "total") {
    const income = currentMonthTsx
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = currentMonthTsx
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return [
      {
        key: "income",
        name: "Income",
        amount: income,
        color: "#C8F7C5",
        icon: "wallet",
      },
      {
        key: "expense",
        name: "Expense",
        amount: expense,
        color: "#FADBD8",
        icon: "bag-remove",
      },
    ];
  }

  const filtered = currentMonthTsx.filter(
    (t) => t.type.toLowerCase() === tab.toLowerCase()
  );

  const grouped = filtered.reduce((acc, t) => {
    const key = t.category.toLowerCase().replace(/\s+/g, "_");
    acc[key] = (acc[key] || 0) + t.amount;
    return acc;
  }, {});

  const total = Object.values(grouped).reduce((a, b) => a + b, 0);

  return Object.entries(grouped).map(([cat, amount]) => ({
    key: cat,
    name: cat.replace(/_/g, " "),
    amount,
    percent: ((amount / total) * 100).toFixed(0),
    color: categoryColors[cat] || "#ccc",
    icon: categoryIcons[cat] || defaultIcon,
  }));
};
