import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import shopReducer from './shopReducer';
import userReducer from './userReducer';
import sliderReducer from './sliderReducer';
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
    adminReducer,
    shopReducer,
    userReducer,
    sliderReducer,
    productReducer,
    categoryReducer,
    orderReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>