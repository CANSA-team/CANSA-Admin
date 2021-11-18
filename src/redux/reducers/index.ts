import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import shopReducer from './shopReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
    adminReducer,
    shopReducer,
    userReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>