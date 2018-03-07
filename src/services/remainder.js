import request from "../utils/request";

export async function getRemainderWeek() {
  return request("/remainder/getRemainderWeek");
}
