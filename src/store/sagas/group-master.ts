import { AnyAction } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import { showMessage } from "..";
import { ENDPOINTS, getApiUrl } from "../endpoints";
import { Requests } from "../requests";
import { AllTypeActions } from "../types";

function* getGroupMasters({
  type,
  page,
  limit,
  name,
}: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_GROUP_MASTERS);
    const data: any = yield Requests.get(apiUrl, { page, limit, name });
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* postGroupMaster({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_GROUP_MASTERS);
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Created group master successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* updateGroupMaster({ type, value, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.UPDATE_GROUP_MASTER, { id });
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

function* deleteGroupMaster({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.DELETE_GROUP_MASTER, { id });
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

function* deleteGroupMasterMore({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_GROUP_MASTERS);
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

export function* groupMasterActions() {
  yield takeLatest(AllTypeActions.GET_GROUP_MASTERS, getGroupMasters);
  yield takeLatest(AllTypeActions.POST_GROUP_MASTER, postGroupMaster);
  yield takeLatest(AllTypeActions.UPDATE_GROUP_MASTER, updateGroupMaster);
  yield takeLatest(AllTypeActions.DELETE_GROUP_MASTER, deleteGroupMaster);
  yield takeLatest(AllTypeActions.DELETE_GROUP_MASTER_MORE, deleteGroupMasterMore);
}
