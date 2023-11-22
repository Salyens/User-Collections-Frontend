const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[0];
};
export default timestampToDate;
