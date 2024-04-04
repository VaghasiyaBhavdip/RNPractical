import { combineReducers, createStore } from 'redux';
import { getUserData } from './reducer/userDataReducer'


const rootReducer = combineReducers({
    UserData:getUserData
});
const store=createStore(rootReducer);

export default store