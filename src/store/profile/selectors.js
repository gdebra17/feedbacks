export function getProfileInfo(reduxState) {
  return {
    profileInfo: reduxState.profileReducer.profileInfo,
    disconnect: reduxState.profileReducer.disconnect,
    id_token: reduxState.profileReducer.id_token,
    message: reduxState.profileReducer.message,
    email: reduxState.profileReducer.email,
    IP: reduxState.profileReducer.IP,
    id:  reduxState.profileReducer.id,
  }
}
