import {
  publishBlog,
  draftBlog,
  getDraft,
  delDraft,
  getTags,
  getBlog,
  getBlogTotal
} from "../services/blog";
import { message } from "antd";
import { routerRedux } from "dva/router";
import remove from "lodash/remove";
export default {
  namespace: "blog",

  state: {
    isPublish: "发布失败",
    isDraft: "保存失败",
    value: "## Hello Gatinul , write now ~ \n > 20170613",
    draftList: [],
    more: true,
    tagList: [],
    dataSource: [],
    totalBlog: 50,
    blogList: []
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
    },
    *getDraft({ payload }, { call, put }) {
      const res = yield call(getDraft, payload);
      yield put({
        type: "draftGet",
        payload: res.success ? res.message : []
      });
    },
    *clearDraft(_, { call, put }) {
      yield put({
        type: "draftClear"
      });
    },
    *editDraft({ payload }, { call, put }) {
      yield put({
        type: "dratfEdit",
        payload: payload
      });
      yield put(routerRedux.push("/blog/new"));
    },
    *delDraft({ payload }, { call, put }) {
      const res = yield call(delDraft, payload);
      yield put({
        type: "draftDel",
        payload: res.success ? res.message : null
      });
    },
    *getTags(_, { call, put }) {
      const res = yield call(getTags);
      yield put({
        type: "tagsGet",
        payload: res.success ? res.message : []
      });
    },
    *getDataSource(_, { call, put }) {
      const res = yield call(getTags);
      yield put({
        type: "dataSourceGet",
        payload: res.success ? res.message : []
      });
    },
    *getBlog({ payload }, { call, put }) {
      const res = yield call(getBlog, payload);
      yield put({
        type: "blogGet",
        payload: res.success ? res.message : []
      });
    },
    *getBlogTotal(_, { call, put }) {
      const res = yield call(getBlogTotal);
      yield put({
        type: "blogTotalGet",
        payload: res.success ? res.message : 0
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
    },
    draftGet(state, action) {
      let b;
      action.payload.length > 0 ? (b = true) : (b = false);
      return {
        ...state,
        draftList: state.draftList.concat(action.payload),
        more: b
      };
    },
    draftClear(state, action) {
      return {
        ...state,
        draftList: [],
        value: "## Hello Gatinul , write now ~ \n > 20170613",
        more: true
      };
    },
    dratfEdit(state, action) {
      return {
        ...state,
        value: action.payload
      };
    },
    draftDel(state, action) {
      const even = remove(state.draftList, n => {
        return n.id == action.payload;
      });
      return {
        ...state,
        draftList: state.draftList
      };
    },
    tagsGet(state, action) {
      return {
        ...state,
        tagList: action.payload
      };
    },
    dataSourceGet(state, action) {
      const arr = [];
      for (let tag of action.payload) {
        arr.push(tag.tag_name);
      }
      return {
        ...state,
        dataSource: arr
      };
    },
    blogGet(state, action) {
      return {
        ...state,
        blogList: action.payload
      };
    },
    blogTotalGet(state, action) {
      return {
        ...state,
        totalBlog: action.payload
      };
    }
  }
};
