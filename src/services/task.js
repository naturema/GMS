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
export async function newTask(params) {
  return request("/task/newTask", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export async function delTask(params) {
  return request("/task/delTask", {
    method: "POST",
    body: params.toString()
  });
}
export async function changeTask(params) {
  return request("/task/changeTask", {
    method: "POST",
    body: params.toString()
  });
}
