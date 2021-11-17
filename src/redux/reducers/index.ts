import { combineReducers } from 'redux';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
    adminReducer
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>