import { storeFeedbacks } from "./actions";

export function feedbacksHandler(dispatch) {
  return {
    storeFeedbacksList: (list)  => dispatch(storeFeedbacks(list)),
  }
}
