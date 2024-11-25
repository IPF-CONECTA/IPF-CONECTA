export const getMonth = (date) => {
  const d = new Date(date);
  return d.getMonth() + 1;
};
