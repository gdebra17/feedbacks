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
