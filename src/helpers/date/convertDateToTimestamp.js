const convertDateToTimestamp = (dateString) => {
  const date = new Date(dateString);
  return date.getTime();
};
export default convertDateToTimestamp;
