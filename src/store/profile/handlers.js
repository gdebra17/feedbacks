import { setProfile, setDisconnect } from "./actions";

export function profileHandler(dispatch) {
  return {
    setProfileInfo: (profile, disconnect, id_token, message, email, IP, id)  => dispatch(setProfile(profile, disconnect, id_token, message, email, IP, id)),
    setDisconnectFunction: ()  => dispatch(setDisconnect()),
  }
}
