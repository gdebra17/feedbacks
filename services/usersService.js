const db = require('./../models/index');
const operator = db.sequelize.Op;
const uuid = require('uuid-v4');


function createNewCustomerUser(username, mail, pathImageUser) {
  return db.users.create({name: username, mail: mail, path_image: pathImageUser, type: "CUSTOMER", token: uuid()});
}

function getUserHeaderByToken(userToken) {
  return db.users.findAll({
    where: {
      token: userToken,
    },
    raw: true
  })
  .then(dbUsers => {
    return dbUsers[0];
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
  getUserByEmail: getUserByEmail,
}
