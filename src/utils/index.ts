export const formatQRCodeValue = (
  name: string,
  cpf?: string,
  date?: string
) => {
  const formatName = name.toUpperCase().replaceAll(" ", "_");
  const threeFirst = cpf?.slice(0, 3);

  return `${formatName}.${threeFirst}.${date}`;
};

export const ArrayIsEmpty = (arr: unknown[]): boolean => {
  return Array.isArray(arr) && arr.length === 0;
};
