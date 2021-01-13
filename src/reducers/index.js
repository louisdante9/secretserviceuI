import { combineReducers } from "redux";

import setCurrentUser from './setCurrentUser'
import notes from './notes'

const rootReducer = combineReducers({
    setCurrentUser,
    notes
})

export default rootReducer;         