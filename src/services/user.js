import request from "../utils/request";

export async function query() {
  return request("/api/users");
}

export async function queryCurrent() {
  return request("/api/currentUser", {
    method: "POST",
    body: localStorage.getItem("antd-pro-authority")
  });
}
