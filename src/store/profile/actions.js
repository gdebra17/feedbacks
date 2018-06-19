export function setProfile(_profile, _disconnect) {
  console.log("setProfile ACTION=", _profile);
  return {
    type: "SET_PROFILE",
    profile: _profile,
    disconnect: _disconnect,
  }
}

export function setDisconnect() {
  console.log("disconnect ACTION=");
  return {
    type: "DISCONNECT",
  }
}
