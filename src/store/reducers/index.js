import {combineReducers} from 'redux';
import counter from './counter';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
    counter,
    form,
});

export default rootReducer;
