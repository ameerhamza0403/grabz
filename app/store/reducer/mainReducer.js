import { USER_LOGIN } from "../action/actiontype";


let initialstate = {
  userData: {
    
  },
  
};

let reducer = (state = initialstate, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        userData: action.userData
      };
   
    default:
      return state;
  }
};

export default reducer;
