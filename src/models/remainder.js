import { getRemainderWeek } from "../services/remainder";

export default {
  namespace: "remainder",
  state: {
    remainderWeek: []
  },
  effects: {
    *getRemainderWeek(_, { call, put }) {
      const res = yield call(getRemainderWeek);
      yield put({
        type: "remainderWeekGet",
        payload: res ? res : []
      });
    }
  },
  reducers: {
    remainderWeekGet(state, action) {
      return {
        ...state,
        remainderWeek: action.payload
      };
    }
  }
};
