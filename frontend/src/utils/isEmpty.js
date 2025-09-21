export const isEmptyTransactions = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return true;
  const total = data.reduce((sum, item) => sum + (item.amount || 0), 0);
  return total === 0;
};
