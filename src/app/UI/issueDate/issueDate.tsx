export const issueDate = (testDate: number): string | undefined => {
  if (!testDate) return;
  const options: any = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const data = new Date(testDate);
  return data.toLocaleString("en-GB", options);
};
