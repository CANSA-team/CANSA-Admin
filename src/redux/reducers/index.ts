import { combineReducers } from 'redux';
import sliderReducer from './sliderReducer';

const rootReducer = combineReducers({
    sliderReducer,
});

export default rootReducer;

export type State = ReturnType<typeof rootReducer>