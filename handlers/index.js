const getFeedbackByToken = require("./getFeedbackByToken");
const getWelcome = require("./getWelcome");
const postNewFeedback = require("./postNewFeedback");
const postNewMessage = require("./postNewMessage");
const getAllProducts = require("./getAllProducts");
const getFeedbackList = require("./getFeedbackList");
const sendMails = require("./sendMails");

module.exports = {
  getFeedbackByToken: getFeedbackByToken,
  getWelcome: getWelcome,
  postNewFeedback: postNewFeedback,
  postNewMessage: postNewMessage,
  getAllProducts: getAllProducts,
  getFeedbackList: getFeedbackList,
  sendMails: sendMails,
}
