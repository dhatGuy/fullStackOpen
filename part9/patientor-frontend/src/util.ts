export const formatDate = (dateStr: string): boolean | string => {
  /**
   *! includes hyphen at index 4, 7
   *! split the date string at hyphen -> array ex: [2020,03,20]
   *! check if number,
   *! array[0] must have 4 digits, not smaller than 2000, not bigger than current year
   *! array[1] must have 2 digits, not bigger than 12, not smaller than 1
   *! array[2] must have 2 digits, not bigger than 31, not smaller than 1
   */
  if (dateStr[4] !== "-" || dateStr[7] !== "-") {
    return "Date format must be YYYY-MM-DD";
  }

  const dateArr = dateStr.split("-");
  const today = new Date();
  const yearStr = dateArr[0];
  const monthStr = dateArr[1];
  const date = dateArr[2];

  if (yearStr.length !== 4) {
    return "Year format must have 4 digits";
  }
  if (isNaN(parseInt(yearStr))) {
    return "Year must be numbers";
  }
  if (parseInt(yearStr) < 2000 || parseInt(yearStr) > today.getFullYear()) {
    return "Year must be from 2000 to current year";
  }
  if (monthStr.length !== 2) {
    return "Month format must have 2 digits";
  }
  if (isNaN(parseInt(monthStr))) {
    return "Month must be numbers";
  }
  if (parseInt(monthStr) < 1 || parseInt(monthStr) > 12) {
    return "Month is not correct";
  }
  if (date.length !== 2) {
    return "date format must have 2 digits";
  }
  if (isNaN(parseInt(date))) {
    return "Date must be numbers";
  }
  if (parseInt(date) < 1 || parseInt(date) > 31) {
    return "Date is not correct";
  }

  return true;
};
