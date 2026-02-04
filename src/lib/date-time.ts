import dayjs from "dayjs";
// dateTime
export const formatDate = (date: any, type: string = "DD MMM YYYY") => {
  return dayjs(date).format(type);
};
export const formatTime = (date: any) => {
  return dayjs(date).format("h:s A");
};

export const formatDateTime = (date: any) => {
  return dayjs(date).format("h:s A - DD MMM YYYY");
};