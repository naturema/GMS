import { publishBlog, draftBlog } from "../services/blog";
import { message } from "antd";

export default {
  namespace: "blog",

  state: {
    isPublish: "发布失败",
    isDraft: "保存失败"
  },

  effects: {
    *publishBlog({ payload }, { call, put }) {
      const response = yield call(publishBlog, payload);
      yield put({
        type: "public",
        payload: response.success ? "发布成功" : "发布失败"
      });
    },
    *draftBlog({ payload }, { call, put }) {
      const response = yield call(draftBlog, payload);
      yield put({
        type: "draft",
        payload: response.success ? "保存成功" : "保存失败"
      });
    }
  },

  reducers: {
    public(state, action) {
      return {
        ...state,
        isPublish: action.payload
      };
    },
    draft(state, action) {
      return {
        ...state,
        isDraft: action.payload
      };
    }
  }
};
