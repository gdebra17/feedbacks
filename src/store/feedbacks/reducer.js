let initialState = {
  feedbacksList: [],
};

function feedbackReducer(state = initialState, action) {
  switch (action.type) {

    case "SAVE_FEEDBACKS":

      return {
        ...state,
        feedbacksList: action.feedbacksList,
      }

    default:
      return state
  }
}

export default feedbackReducer;
