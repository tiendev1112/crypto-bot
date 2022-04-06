import { AllTypeActions } from "../types";

export const getTransactions = (page: number, limit: number, masterId: any): any => {
  return {
    type: AllTypeActions.GET_TRANSACTIONS,
    page,
    limit,
    masterId
  };
};

export const getTransactionMasters = (): any => {
  return {
    type: AllTypeActions.GET_TRANSACTION_MASTERS,
  };
};
