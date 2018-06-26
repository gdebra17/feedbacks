import { addMessage } from "./actions/index";

export function messageHandler(dispatch) {
  return {
    addMessage: (message, author)  => dispatch(addMessage(message, author)),
  }
}
