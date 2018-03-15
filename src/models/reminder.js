import { getReminderWeek } from "../services/reminder";

export default {
  namespace: "reminder",
  state: {
    reminderWeek: []
  },
  effects: {
    *getReminderWeek(_, { call, put }) {
      const res = yield call(getReminderWeek);
      yield put({
        type: "reminderWeekGet",
        payload: res ? res : []
      });
    }
  },
  reducers: {
    reminderWeekGet(state, action) {
      return {
        ...state,
        reminderWeek: action.payload
      };
    }
  }
};
