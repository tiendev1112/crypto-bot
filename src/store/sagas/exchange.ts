import { AnyAction } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import { showMessage } from "..";
import { ENDPOINTS, getApiUrl } from "../endpoints";
import { Requests } from "../requests";
import { AllTypeActions } from "../types";

function* getExchanges({ type }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_EXCHANGES);
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

function* postExchange({ type, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_EXCHANGES);
    const data: any = yield Requests.post(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Create exchange successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* updateExchange({ type, id, value }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.UPDATE_EXCHANGE, { id });
    const data: any = yield Requests.patch(apiUrl, value, true, true);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Update successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* deleteExchange({ type, id }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.UPDATE_EXCHANGE, { id });
    const data: any = yield Requests.delete(apiUrl);
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
      yield put(showMessage("Delete successful!", "success"));
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

export function* exchangeActions() {
  yield takeLatest(AllTypeActions.GET_EXCHANGES, getExchanges);
  yield takeLatest(AllTypeActions.POST_EXCHANGE, postExchange);
  yield takeLatest(AllTypeActions.UPDATE_EXCHANGE, updateExchange);
  yield takeLatest(AllTypeActions.DELETE_EXCHANGE, deleteExchange);
}
