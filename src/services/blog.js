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
export async function getBlog(params) {
  return request("/blog/getBlog", {
    method: "POST",
    body: params.toString()
  });
}
export async function getBlogTotal() {
  return request("/blog/getBlogTotal");
}
export async function getTagColor() {
  return request("/blog/getTagColor");
}
export async function editTag(params) {
  return request("/blog/editTag", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export async function newTag(params) {
  return request("/blog/newTag", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
export async function delTag(params) {
  return request("/blog/delTag", {
    method: "POST",
    body: JSON.stringify(params)
  });
}
