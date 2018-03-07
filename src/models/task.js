import { getWorkTodo, getMyTodo } from "../services/task";

export default {
  namespace: "task",

  state: {
    workTodo: [],
    myTodo: []
  },
  effects: {
    *getWorkTodo({ payload }, { call, put }) {
      const res = yield call(getWorkTodo, payload);
      yield put({
        type: "workTodoGet",
        payload: res ? res : []
      });
    },
    *getMyTodo({ payload }, { call, put }) {
      const res = yield call(getMyTodo, payload);
      yield put({
        type: "myTodoGet",
        payload: res ? res : []
      });
    }
  },
  reducers: {
    workTodoGet(state, action) {
      return {
        ...state,
        workTodo: action.payload
      };
    },
    myTodoGet(state, action) {
      return {
        ...state,
        myTodo: action.payload
      };
    }
  }
};
