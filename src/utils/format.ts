export const capitalize = (str: string): string => {
  const format = str.split(" ");
  const upper = format
    .map((items) => items.charAt(0).toUpperCase() + items.slice(1))
    .join(" ");

  return upper;
};

export const formattedDate = (date: string): string => {
  return date
    .replaceAll("/", "-")
    .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
};
