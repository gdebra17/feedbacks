import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'

// const mapDispatchToProps = dispatch => ({
//   dispatch: (path) => {
//     dispatch(loadDiscussion(path))
//   }
// })

export const MessagesList = connect(state => ({
  messages: state.tchatReducer.messagesReducer.messages.messages,

}), {})(MessagesListComponent)
