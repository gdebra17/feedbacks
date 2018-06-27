const db = require('./../models/index');
const operator = db.sequelize.Op;
const uuid = require('uuid-v4');


function createNewCustomerUser(username, mail, pathImageUser) {
  return db.users.create({name: username, mail: mail, path_image: pathImageUser, type: "CUSTOMER", token: uuid()});
}

function getUserHeaderByToken(userToken) {
  // console.log("userToken is :", userToken);
  return db.users.findAll({
    where: {
      token: userToken,
    },
    raw: true
  })
  .then(dbUsers => {
    // console.log("the dbUser found is :", dbUsers);
    return dbUsers[0];
  })
}


function getNameByUserId(id){
  return db.users.findAll({
    where: {
      id: id,
    },
    raw: true
  })
  .then(dbUsers => {
    return dbUsers[0];
  })
}

function getUserByFeedbackToken(feedbackToken) {
  let user_id;
  return db.feedbacks.findAll({
    where: {
      token: feedbackToken,
    },
    raw: true
  })
  .then(dbUsers => {
    // console.log("the dbUser found is :", dbUsers[0]);
    return dbUsers[0].user_id;
  })
  .then(dbUserId => {
    return db.users.findAll({
      where: {
        id: dbUserId,
      },
      raw:true
    })
  })
}

function getIPByFeedbackToken(feedbackToken) {
  return db.feedbacks.findAll({
    where: {
      token: feedbackToken,
    },
    raw: true
  })
  .then(dbUsers => {
    // console.log("from users table")
    return dbUsers[0].product_id;
  })
  .then(dbProductId => {
    return db.products.findAll({
      where: {
        id: dbProductId,
      },
      raw:true
    })
  })
  .then(dbUsers => {
    return dbUsers[0].user_id;
  })
  .then(dbUserId => {
    return db.users.findAll({
      where: {
        id: dbUserId,
      },
      raw:true
    })
  })
}

function getUserByEmail(email) {
  return db.users.findAll({
    where: {
      mail: email,
    }
  });
}

module.exports = {
  createNewCustomerUser: createNewCustomerUser,
  getUserHeaderByToken: getUserHeaderByToken,
  getUserByFeedbackToken: getUserByFeedbackToken,
  getIPByFeedbackToken: getIPByFeedbackToken,
  getNameByUserId: getNameByUserId,
  getUserByEmail: getUserByEmail,
}
