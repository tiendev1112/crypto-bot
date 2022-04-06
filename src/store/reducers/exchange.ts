import { AnyAction, Reducer } from 'redux';
import { AllTypeActions } from '../types';
import { GlobalReducer, IAppRequestState, initialRequestState } from './state';

export const GetExchangesReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_EXCHANGES.toString());
};

export const PostExchangeReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_EXCHANGE.toString());
};

export const UpdateExchangeReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.UPDATE_EXCHANGE.toString());
};

export const DeleteExchangeReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_EXCHANGE.toString());
};
