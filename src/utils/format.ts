export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formattedDate = (date: string): string => {
  return date
    .replaceAll("/", "-")
    .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
};
