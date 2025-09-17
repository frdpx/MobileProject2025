export const normalizeKey = (str) => {
  if (!str) return "";
  return str.trim().toLowerCase().replace(/\s+/g, "_");
};
