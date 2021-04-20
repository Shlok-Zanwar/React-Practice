import countReducer from './Counter'
import loggedReducer from './IsLogged'
import { combineReducers } from "redux";

const allReducer = combineReducers({
    countReducer,
    loggedReducer
})

export default allReducer;