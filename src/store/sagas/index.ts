import { all, fork } from 'redux-saga/effects';
import { adminActions } from './admin';
import { exchangeActions } from './exchange';
import { followerActions } from './follower';
import { groupMasterActions } from './group-master';
import { masterActions } from './master';
import { rateActions } from './rate';
import { transactionActions } from './transaction';

export function* AllSagaActions() {
	yield all([
		fork(adminActions),
		fork(rateActions),
		fork(groupMasterActions),
		fork(transactionActions),
		fork(exchangeActions),
		fork(masterActions),
		fork(followerActions),
	]);
}
