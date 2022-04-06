import { AnyAction } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import { showMessage } from "..";
import { ENDPOINTS, getApiUrl } from "../endpoints";
import { Requests } from "../requests";
import { AllTypeActions } from "../types";

function* getRates({ type, page, limit }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_RATES);
    const data: any = yield Requests.get(apiUrl, { page, limit });
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* postRate({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_RATES);
    const data: any = yield Requests.post(
      apiUrl,
      { value, name: `${value}%`, state: "active" },
      true,
      true
    );
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Created rate successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* updateRate({ type, value, id, state }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.UPDATE_RATE, { id });
    const data: any = yield Requests.patch(
      apiUrl,
      { value, name: `${value}%`, state },
      true,
      true
    );
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Updated rate successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* deleteRate({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.DELETE_RATE, { id });
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

export function* rateActions() {
  yield takeLatest(AllTypeActions.GET_RATES, getRates);
  yield takeLatest(AllTypeActions.POST_RATE, postRate);
  yield takeLatest(AllTypeActions.UPDATE_RATE, updateRate);
  yield takeLatest(AllTypeActions.DELETE_RATE, deleteRate);
}
