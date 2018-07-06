export function storeFeedbacks(_list) {
  console.log("storeFeedbacks ACTION=", _list);
  return {
    type: "SAVE_FEEDBACKS",
    feedbacksList: _list,
  }
}
