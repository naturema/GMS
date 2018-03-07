import request from "../utils/request";

export async function getTodoTask() {
  return request("task/todoTask");
}
