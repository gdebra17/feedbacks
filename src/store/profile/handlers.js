import { setProfile, setDisconnect } from "./actions";

export function profileHandler(dispatch) {
  return {
    setProfileInfo: (profile, disconnect, id_token, message, email)  => dispatch(setProfile(profile, disconnect, id_token, message, email)),
    setDisconnectFunction: ()  => dispatch(setDisconnect()),
  }
}
