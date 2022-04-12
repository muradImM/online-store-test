import {combineReducers} from "redux";
import valueReducer from "./valueReducer";
import itemReducer from "./itemReducer";

const rootReducer = combineReducers({
    valueReducer,
    itemReducer
})

export default rootReducer