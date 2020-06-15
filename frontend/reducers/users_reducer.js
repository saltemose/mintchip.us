import { RECEIVE_CURRENT_USER,
  RECEIVE_USER_INFO 

} from '../actions/session_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_USER_INFO:
        return {[action.info.id]: action.info};
      default:
      return state;
  }
};

export default usersReducer;