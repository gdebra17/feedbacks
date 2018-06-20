import { combineReducers } from "redux"
import {incomingMessagesReducer, messagesReducer} from "./messages"
import users from "./users"

const chat = combineReducers({
  messagesReducer,
  incomingMessagesReducer,
  users
});

export default chat
