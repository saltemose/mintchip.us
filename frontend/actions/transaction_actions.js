import * as TransactionAPIUtil from "../util/transaction_api_util";

export const RECEIVE_TRANSACTIONS = 'RECEIVE_TRANSACTIONS';
export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION';

const receiveTransactions = transactions => ({
    type: RECEIVE_TRANSACTIONS,
    transactions
})

const receiveTransaction = transaction => ({
    type: RECEIVE_TRANSACTION,
    transaction
  });

export const fetchTransactions = () => dispatch => (
    TransactionAPIUtil.fetchTransactions()
    .then(transaction => dispatch(receiveTransactions(transaction)))
);

export const createTransaction = formTransaction => dispatch => (
    TransactionAPIUtil.createTransaction(formTransaction)
      .then(transaction => {
        dispatch(receiveTransaction(transaction));
        window.location.reload();
      })
);

