import { createStore, combineReducers } from 'redux';
import userloginReducer from './reducer/login';


const rootReducer = combineReducers({
    userlogin: userloginReducer,
});

const configureStore = () => {
    return createStore(rootReducer);
};

export default configureStore;