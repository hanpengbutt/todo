const isSameDate = (date1: Date, date2: Date) => {
  return date1.toDateString() === date2.toDateString();
};

export default isSameDate;
