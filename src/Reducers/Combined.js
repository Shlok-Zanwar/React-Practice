import { combineReducers } from "redux";
import dateTimeReducer from "./DateTimeReducer"
import pannelDetailsReducer from './PannelDetailsReducer'
import imageDetailsReducer from './ImageDetailsReducer'
import loadingReducer from './LoadingReducer'

const allReducers = combineReducers({
    dateTimeReducer,
    pannelDetailsReducer,
    imageDetailsReducer,
    loadingReducer
})

export default allReducers;