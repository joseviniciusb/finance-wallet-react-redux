const INITIAL_STATE = {
  email: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SAVE_USER_EMAIL':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};
