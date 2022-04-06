import { AnyAction } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import { showMessage } from "..";
import { ENDPOINTS, getApiUrl } from "../endpoints";
import { Requests } from "../requests";
import { AllTypeActions } from "../types";

function* getMasters({ type, page, limit, name }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_MASTERS);
    const data: any = yield Requests.get(apiUrl, {
      page,
      limit,
      username: name,
    });
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* getMaster({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_MASTER, { id });
    const data: any = yield Requests.get(apiUrl);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* postMaster({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_MASTERS);
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Created master successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* updateMaster({ type, value, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_MASTER, { id });
    const data: any = yield Requests.patch(apiUrl, { ...value }, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Updated successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* changeActiveMaster({ type, value, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.CHANGE_ACTIVE_MASTER, { id });
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Updated successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* deleteMaster({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_MASTER, { id });
    const data: any = yield Requests.delete(apiUrl);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Deleted successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* deleteMasterMore({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_MASTERS);
    const data: any = yield Requests.delete(apiUrl, {}, true, true, value);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Deleted successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

export function* masterActions() {
  yield takeLatest(AllTypeActions.GET_MASTERS, getMasters);
  yield takeLatest(AllTypeActions.GET_MASTER, getMaster);
  yield takeLatest(AllTypeActions.POST_MASTER, postMaster);
  yield takeLatest(AllTypeActions.UPDATE_MASTER, updateMaster);
  yield takeLatest(AllTypeActions.CHANGE_ACTIVE_MASTER, changeActiveMaster);
  yield takeLatest(AllTypeActions.DELETE_MASTER, deleteMaster);
  yield takeLatest(AllTypeActions.DELETE_MASTER_MORE, deleteMasterMore);
}
