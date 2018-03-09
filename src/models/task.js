import {
  getWorkTodo,
  getMyTodo,
  getAllTask,
  getCount,
  getTotalTask
} from "../services/task";

export default {
  namespace: "task",

  state: {
    workTodo: [],
    myTodo: [],
    allTask: [],
    count: {},
    totalTask: 50
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
    },
    *getAllTask({ payload }, { call, put }) {
      const res = yield call(getAllTask, payload);
      yield put({
        type: "allTaskGet",
        payload: res ? res : []
      });
    },
    *getCount(_, { call, put }) {
      const res = yield call(getCount);
      yield put({
        type: "countGet",
        payload: res
      });
    },
    *getTotalTask({ payload }, { call, put }) {
      const res = yield call(getTotalTask, payload);
      yield put({
        type: "totalTaskGet",
        payload: res ? res : 50
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
    },
    allTaskGet(state, action) {
      return {
        ...state,
        allTask: action.payload
      };
    },
    countGet(state, action) {
      return {
        ...state,
        count: action.payload
      };
    },
    totalTaskGet(state, action) {
      return {
        ...state,
        totalTask: action.payload
      };
    }
  }
};
