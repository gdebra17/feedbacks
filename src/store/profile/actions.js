export function setProfile(_profile, _disconnect, _id_token, _message, _email, _ip, _id) {
  console.log("setProfile ACTION=", _profile);
  return {
    type: "SET_PROFILE",
    profile: _profile,
    disconnect: _disconnect,
    id_token: _id_token,
    message: _message,
    email: _email,
    IP: _ip,
    id: _id,
  }
}

export function setDisconnect() {
  console.log("disconnect ACTION=");
  return {
    type: "DISCONNECT",
  }
}
