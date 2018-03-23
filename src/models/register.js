import { register, review } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({payload}, { call, put }) {
      const response = yield call(register,payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *review({payload}, {call,put}) {
      yield call(review,payload)
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      setAuthority(payload.currentAuthority);
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
