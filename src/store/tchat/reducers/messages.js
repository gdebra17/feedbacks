import { sendMessage, loadDiscussion } from '../../sendWs.js'

const initialState = {
  message: {
    newMessage: '',
    currentChannel: ''
  },
  messages : {
    channels: [],
    messages: [],
  }
}

export function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      sendMessage(action.pathname, state.message.currentChannel ,action.message);
      return state;
      // return {
      //   ...state,
      //   message:{
      //     newMessage: action.message,
      //     currentChannel: action.pathname,
      //   },
      //   messages: {
      //     ...state.messages,
      //     messages: [...state.messages.messages, {id: action.id, message: action.message, author: action.author}],
      //   }
      // }
      case 'MESSAGE_RECEIVED':
        // return state = {
        //   ...state,
        //   message:{
        //     newMessage: action.message,
        //     currentChannel: '',
        //   },
        //   messages: {
        //     ...state.messages,
        //     messages: [...state.messages.messages, {id: action.id, message: action.message, author: "sender"}],
        //   }
        // }
        console.log("action/message is : ", action);
        if(action.messages === undefined){return state}
        return {...state,
          messages: {
            ...state.messages,
            messages: [...state.messages.messages, {id: action.id, message: action.messages, author: action.author}],
          }}
    case 'SENDMESSAGEANDRESET':
      sendMessage(state.currentChannel ,state.newMessage)
      return {...state, newMessage: ''}
      /* falls through */
    case 'LOAD_DISCUSSION':
      loadDiscussion(action.pathname);
      /* falls through */
    default:
      return state
  }
}

export function incomingMessagesReducer(state = initialState.messages, action) {
  switch (action.type) {
    case 'INCOMINGMESSAGES':
      return {...state, messages: action.messages}
    case 'CHANNELS':
      return state = {...state, channels: action.channels}
    default:
      return state
  }
}

// const middleware = routerMiddleware(history);

// const rootReducer = combineReducers({
//   message: messagesReducer,
//   messages: incomingMessagesReducer,
//   router: routerReducer
// })
//
// export default rootReducer
