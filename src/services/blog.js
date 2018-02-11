import request from "../utils/request";

export async function publishBlog(params) {
  return request("/blog/publish", {
    method: "POST",
    body: params
  });
}
export async function draftBlog(params) {
  return request("/blog/draft", {
    method: "POST",
    body: params
  });
}
