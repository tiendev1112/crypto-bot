import { AnyAction, Reducer } from 'redux';
import { AllTypeActions } from '../types';
import { GlobalReducer, IAppRequestState, initialRequestState } from './state';

export const GetTransactionsReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_TRANSACTIONS.toString());
};

export const GetTransactionMastersReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_TRANSACTION_MASTERS.toString());
};
