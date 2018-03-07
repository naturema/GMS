import request from "../utils/request";

export async function getWorkTodo(params) {
  return request("/task/getWorkTodo", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export async function getMyTodo(params) {
  return request("/task/getMyTodo", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
