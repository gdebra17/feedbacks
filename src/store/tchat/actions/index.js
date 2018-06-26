import * as types from '../constants/ActionTypes'

let nextMessageId = 0
let nextUserId = 0

export const addMessage = (message, author, pathname) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author,
  pathname
})

export const loadDiscussion = (pathname) => ({
  type: "LOAD_DISCUSSION",
  pathname
})

export const addUser = name => ({
  type: types.ADD_USER,
  id: nextUserId++,
  name
})

export const messageReceived = (message, author, path) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author,
  path
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
})
