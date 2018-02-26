import request from "../utils/request";

export async function publishBlog(params) {
  return request("/blog/publish", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export async function draftBlog(params) {
  return request("/blog/draft", {
    method: "POST",
    body: params
  });
}
export async function getDraft(params) {
  return request("/blog/getDraft", {
    method: "POST",
    body: params.toString()
  });
}
export async function delDraft(params) {
  return request("/blog/delDraft", {
    method: "POST",
    body: params.toString()
  });
}
export async function getTags() {
  return request("/blog/getTags");
}
