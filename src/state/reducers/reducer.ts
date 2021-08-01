import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { districtsReducer } from "./districtsReducer";

const reducers = combineReducers({
    user: userReducer,
    districts: districtsReducer
});

export default reducers;