const transformToDate = (timeStamp) => {
  const date = new Date(timeStamp);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return formattedDate;
};

export default transformToDate;
