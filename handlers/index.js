const getFeedbackByToken = require("./getFeedbackByToken");
const getWelcome = require("./getWelcome");
const postNewFeedback = require("./postNewFeedback");
const postNewMessage = require("./postNewMessage");
const getAllProducts = require("./getAllProducts");

module.exports = {
  getFeedbackByToken: getFeedbackByToken,
  getWelcome: getWelcome,
  postNewFeedback: postNewFeedback,
  postNewMessage: postNewMessage,
  getAllProducts: getAllProducts,
}
