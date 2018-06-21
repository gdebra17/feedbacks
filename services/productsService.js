const db = require('./../models/index');
const operator = db.sequelize.Op;
const uuid = require('uuid-v4');

function dbProductToFacade(dbProduct) {
  return {id: dbProduct.id, name: dbProduct.name, decathlonId: dbProduct.decathlonid, productUrl: dbProduct.url, expiringDate: dbProduct.expiringdate, userId: dbProduct.user_id, createdDate: dbProduct.createdAt};
}


function getAllProducts() {
  return db.products.findAll({
    raw: true
  })
  .then(dbProducts => {
    return dbProducts.map(dbProduct => dbProductToFacade(dbProduct));
  })
}

module.exports = {
  getAllProducts: getAllProducts,
}
