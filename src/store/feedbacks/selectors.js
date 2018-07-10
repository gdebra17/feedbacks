export function getFeedbacksList(reduxState) {
  return {
    feedbacksList: reduxState.feedbackReducer.feedbacksList,
  }
}
