import { combineReducers } from "redux";
import dateTimeReducer from "./DateTimeReducer"
import pannelDetailsReducer from './PannelDetailsReducer'
import imageDetailsReducer from './ImageDetailsReducer'

const allReducers = combineReducers({
    dateTimeReducer,
    pannelDetailsReducer,
    imageDetailsReducer
})

export default allReducers;