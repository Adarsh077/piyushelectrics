const convertToYY_MM_DD = (date) => {
  date = new Date(date);
  let month = date.getMonth() + 1;
  month = `0${month}`.slice(-2);
  const currentDate = `0${date.getDate()}`.slice(-2);

  return `${date.getFullYear()}-${month}-${currentDate}`;
};

export default convertToYY_MM_DD;
