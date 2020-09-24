import { USER_LOGIN } from "../action/login";



let initialstate = {
  userData: {

  },

};

let reducer = (state = initialstate, action) => {
  switch (action.type) {
    case USER_LOGIN:
      console.log(action.userData,':::::::')
      return {
        ...state,
        userData: action.userData
      };
    default:
      return state;
  }
};

export default reducer;
