import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import shopReducer from './shopReducer';
import sliderReducer from './sliderReducer';
import productReducer from './productReducer';

const rootReducer = combineReducers({
    adminReducer,
    shopReducer,
    sliderReducer,
    productReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>