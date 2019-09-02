import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import twoDReducer from './2DReducer';
import faceReducer from './faceReducer';
import flagsReducer from './flagsReducer';
import timerReducer from './timerReducer';

export default combineReducers({
    simpleReducer,
    twoDReducer,
    faceReducer,
    flagsReducer,
    timerReducer

});