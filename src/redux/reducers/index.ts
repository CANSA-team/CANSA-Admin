import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import shopReducer from './shopReducer';

const rootReducer = combineReducers({
    adminReducer,
    shopReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>