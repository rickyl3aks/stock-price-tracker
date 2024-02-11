const getFormattedDate = (years: number) => {
  const currentDate = new Date();
  const modifiedDate = new Date(currentDate);
  modifiedDate.setFullYear(currentDate.getFullYear() + years);

  return `${modifiedDate.getFullYear()}-${(modifiedDate.getMonth() + 1).toString().padStart(2, "0")}-${modifiedDate
    .getDate()
    .toString()
    .padStart(2, "0")}`;
};

export const minRestriction = () => getFormattedDate(-2);

export const maxRestriction = () => getFormattedDate(0);
