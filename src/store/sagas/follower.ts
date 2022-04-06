import { AnyAction } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import { showMessage } from "..";
import { ENDPOINTS, getApiUrl } from "../endpoints";
import { Requests } from "../requests";
import { AllTypeActions } from "../types";

function* getFollowers({
  type,
  page,
  limit,
  valueSearch,
}: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const { username, masterGroup, noExpired, expired } = valueSearch;
    const valuePush = {
      page,
      limit,
      username,
      masterGroup: masterGroup[0] === "" ? "" : masterGroup,
      noExpired,
      expired,
    };
    const apiUrl = getApiUrl(ENDPOINTS.GET_FOLLOWERS);
    const data: any = yield Requests.get(apiUrl, valuePush);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* getFollower({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_FOLLOWER, { id });
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

function* postFollower({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_FOLLOWERS);
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Created follower successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* updateFollower({ type, value, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_FOLLOWER, { id });
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

function* deleteFollower({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_FOLLOWER, { id });
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

function* deleteFollowerMore({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_FOLLOWERS);
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

function* renewalFollower({ type, value, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.RENEWAL_FOLLOWER, { id });
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Expired successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* changeActiveFollower({ type, value, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.CHANGE_ACTIVE_FOLLOWER, { id });
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

export function* followerActions() {
  yield takeLatest(AllTypeActions.GET_FOLLOWERS, getFollowers);
  yield takeLatest(AllTypeActions.GET_FOLLOWER, getFollower);
  yield takeLatest(AllTypeActions.POST_FOLLOWER, postFollower);
  yield takeLatest(AllTypeActions.UPDATE_FOLLOWER, updateFollower);
  yield takeLatest(AllTypeActions.DELETE_FOLLOWER, deleteFollower);
  yield takeLatest(AllTypeActions.DELETE_FOLLOWER_MORE, deleteFollowerMore);
  yield takeLatest(AllTypeActions.RENEWAL_FOLLOWER, renewalFollower);
  yield takeLatest(AllTypeActions.CHANGE_ACTIVE_FOLLOWER, changeActiveFollower);
}
