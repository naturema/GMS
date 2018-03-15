import request from "../utils/request";

export async function getReminderWeek() {
  return request("/reminder/getReminderWeek");
}
