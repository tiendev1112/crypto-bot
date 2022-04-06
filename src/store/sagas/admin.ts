import { AllTypeActions } from "../types";
import { put, takeLatest } from "redux-saga/effects";
import { Requests } from "../requests";
import { AnyAction } from "redux";
import { getApiUrl, ENDPOINTS } from "../endpoints";
import { KEY_TOKEN_SIGNIN, USER_TYPE } from "../../constants";
import { hideLoading, showLoading, showMessage } from "..";

function* postLogin({ input, type }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  yield put(showLoading());
  try {
    const apiUrl = getApiUrl(ENDPOINTS.POST_LOGIN);
    const data: any = yield Requests.post(apiUrl, input, false, true);
    yield put(hideLoading());
    if (data) {
      localStorage.setItem(KEY_TOKEN_SIGNIN, data?.accessToken);
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* getCurrentAdmin({ type }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_CURRENT_ADMIN);
    const data: any = yield Requests.get(apiUrl);
    if (data) {
      localStorage.setItem("role", data?.type);
      yield put({ type: `${type}_SUCCESS`, data: data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* getUsers({
  type,
  page,
  limit,
  username,
  typeAccount,
}: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_USERS);
    const data: any = yield Requests.get(apiUrl, {
      page,
      limit,
      username,
      type: typeAccount,
    });
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data: data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* postUser({ type, value, typeAccount }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const urlValue =
      typeAccount === USER_TYPE.subAdmin
        ? ENDPOINTS.POST_USER_SUB_ADMIN
        : ENDPOINTS.POST_USER_SUPPORT;
    const apiUrl = getApiUrl(urlValue);
    const valuePushSupport = { ...value };
    delete valuePushSupport.exchangePhoto;
    delete valuePushSupport.backgroundPhoto;
    delete valuePushSupport.groupPhoto;
    delete valuePushSupport.groupLimit;
    const data: any = yield Requests.post(
      apiUrl,
      typeAccount === USER_TYPE.support ? valuePushSupport : value,
      true,
      typeAccount === USER_TYPE.support
    );
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data: data });
      yield put(showMessage("Created user successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* updateUser({
  type,
  id,
  value,
  typeAccount,
}: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const urlUpdate =
      typeAccount === USER_TYPE.subAdmin
        ? ENDPOINTS.UPDATE_USER_SUB_ADMIN
        : ENDPOINTS.UPDATE_USER_SUPPORT;
    const apiUrl = getApiUrl(urlUpdate, { id });
    const data: any = yield Requests.post(apiUrl, value);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data: data });
      yield put(showMessage("Updated user successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* changeGroupLimit({
  type,
  id,
  value,
}: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.CHANGE_GROUP_LIMIT, { id });
    const data: any = yield Requests.put(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data: data });
      yield put(showMessage("Updated user successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* deleteUser({ type, id, typeAccount }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const urlValue =
      typeAccount === USER_TYPE.subAdmin
        ? ENDPOINTS.UPDATE_USER_SUB_ADMIN
        : ENDPOINTS.UPDATE_USER_SUPPORT;
    const apiUrl = getApiUrl(urlValue, { id });
    const data: any = yield Requests.delete(apiUrl);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data: data });
      yield put(showMessage("Deleted user successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* postSticky({ message, type }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.POST_STICKY);
    const data: any = yield Requests.post(apiUrl, message, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Save notification successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* changePassword({ type, id, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.CHANGE_PASSWORD, { id });
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Change password successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* changeActiveUser({ type, id, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.CHANGE_ACTIVE_USER, { id });
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Change active successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

export function* adminActions() {
  yield takeLatest(AllTypeActions.POST_LOGIN, postLogin);
  yield takeLatest(AllTypeActions.GET_CURRENT_ADMIN, getCurrentAdmin);
  yield takeLatest(AllTypeActions.GET_USERS, getUsers);
  yield takeLatest(AllTypeActions.POST_USER, postUser);
  yield takeLatest(AllTypeActions.UPDATE_USER, updateUser);
  yield takeLatest(AllTypeActions.DELETE_USER, deleteUser);
  yield takeLatest(AllTypeActions.POST_STICKY, postSticky);
  yield takeLatest(AllTypeActions.CHANGE_PASSWORD, changePassword);
  yield takeLatest(AllTypeActions.CHANGE_ACTIVE_USER, changeActiveUser);
  yield takeLatest(AllTypeActions.CHANGE_GROUP_LIMIT, changeGroupLimit);
}
