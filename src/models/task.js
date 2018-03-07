import { getTodoTask } from "../services/task";

export default {
  namespace: "task",

  state: {
    todoTask: []
  },
  effects: {
    *getTodoTask(_, { call, put }) {
      const res = yield call(getTodoTask);
      yield put({
        type: "todoTaskGet",
        payload: res ? res : []
      });
    }
  },
  reducers: {
    todoTaskGet(state, action) {
      return {
        ...state,
        todoTask: action.payload
      };
    }
  }
};
