export const normalizeKey = (str) => {
  if (!str) return "";
  return str.trim().toLowerCase().replace(/\s+/g, "_");
};

export const displayCategoryName = (key) => {
  if (!key) return "";

  const map = {
    salary: "Salary",
    bonus: "Bonus",
    gift: "Gift",
    additional_income: "Additional Income",
    other: "Other",
    food: "Food",
    shopping: "Shopping",
    travel: "Travel",
    medical: "Medical",
    party: "Party",
    sport: "Sport",
    other_expense: "Other Expense",
  };
  return (
    map[key] || key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
};
