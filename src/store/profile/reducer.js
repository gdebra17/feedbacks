let initialState = {
  profileInfo: {},
  disconnect: {},
};

function profileReducer(state = initialState, action) {
  switch (action.type) {

    case "SET_PROFILE":

      return {
        ...state,
        profileInfo: action.profile,
        disconnect: action.disconnect,
        id_token: action.id_token,
        message: action.message,
        email: action.email,
        IP: action.IP,
        id: action.id,
      }

    case "DISCONNECT":

      return {
        ...state,
        profileInfo: {},
      }

    default:
      return state
  }
}


export default profileReducer;
