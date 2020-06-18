import * as DepositAPIUtil from "../util/desposit_api_util";

export const RECEIVE_DEPOSIT = 'RECEIVE_DEPOSIT';

const receiveDeposit = deposit => ({
    type: RECEIVE_DEPOSIT,
    deposit
  });

  export const createDeposit = formDeposit => dispatch => (
    DepositAPIUtil.createDeposit(formDeposit)
      .then(deposit => {
        dispatch(receiveDeposit(deposit));
        window.location.reload();
      })
);