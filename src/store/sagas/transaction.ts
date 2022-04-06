import { AnyAction } from "redux";
import { put, takeLatest } from "redux-saga/effects";
import { ENDPOINTS, getApiUrl } from "../endpoints";
import { Requests } from "../requests";
import { AllTypeActions } from "../types";

function* getTransactions({ type, page, limit, masterId }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_TRANSACTIONS);
    const data: any = yield Requests.get(apiUrl, { page, limit, masterId });
    if (data) {
      yield put({ type: `${type}_SUCCESS`, data });
    } else {
      yield put({ type: `${type}_FAIL`, error: data.message });
    }
  } catch (e: any) {
    yield put({ type: `${type}_FAIL`, error: e?.response?.data?.message.toString() });
  }
}

function* getTransactionMasters({ type }: AnyAction): Generator<any> {
  yield put({ type: `${type}_ATTEMPT` });
  try {
    const apiUrl = getApiUrl(ENDPOINTS.GET_TRANSACTION_MASTERS);
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

export function* transactionActions() {
  yield takeLatest(AllTypeActions.GET_TRANSACTIONS, getTransactions);
  yield takeLatest(AllTypeActions.GET_TRANSACTION_MASTERS, getTransactionMasters);
}
