const productsService = require("./../services/productsService");

function getAllProducts(request, result) {
  //console.log("handlers/getAllProducts");
  return productsService.getAllProducts()
  .then((infos) => {
    result.json(infos);
  })
}

module.exports = getAllProducts;
