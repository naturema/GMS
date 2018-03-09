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
export async function getAllTask(params) {
  return request("/task/getAllTask", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export async function getCount() {
  return request("/task/getCount");
}
export async function getTotalTask(params) {
  return request("/task/getTotalTask", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
