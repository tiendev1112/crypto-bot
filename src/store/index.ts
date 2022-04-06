import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AllSagaActions } from './sagas';
import { ApplicationState } from './reducers';

const initialAppState: any = {};
export const getStore = (initialState = initialAppState) => {
	const composeEnhancers = composeWithDevTools({});
	const sagaMiddleware = createSagaMiddleware();
	const appStore = createStore(ApplicationState, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));
	sagaMiddleware.run(AllSagaActions);
	return appStore;
};

export * from './endpoints';
export * from './actions';
export * from './reducers';
export * from './sagas';
export * from './types';
export * from './requests';
