import { AnyAction, Reducer } from 'redux';
import { AllTypeActions } from '../types';
import { GlobalReducer, IAppRequestState, initialRequestState } from './state';

export const GetRatesReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.GET_RATES.toString());
};

export const PostRateReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.POST_RATE.toString());
};

export const UpdateRateReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.UPDATE_RATE.toString());
};

export const DeleteRateReducer: Reducer = (state: IAppRequestState = initialRequestState, action: AnyAction) => {
	return GlobalReducer(state, action, AllTypeActions.DELETE_RATE.toString());
};