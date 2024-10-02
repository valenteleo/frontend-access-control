import moment from "moment";

export const formatQRCodeValue = (name: string, employee?: string) => {
  const formatName = name.toUpperCase().replaceAll(" ", "_");
  const formatDate = moment().format().split("T")[0];

  return `${formatName}.${formatDate}`.concat(employee ? `.${employee}` : "");
};

export const ArrayIsEmpty = (arr: unknown[]): boolean => {
  return Array.isArray(arr) && arr.length === 0;
};
