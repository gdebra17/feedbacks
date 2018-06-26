import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../store/tchat/actions'

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author, path) => {
    dispatch(addMessage(message, author, path))
  }
})

export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent)
