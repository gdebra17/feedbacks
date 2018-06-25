const productsService = require("./../services/productsService");

function getAllProducts(request, result) {
  //console.log("handlers/getAllProducts");
  return productsService.getAllProducts()
  .then((infos) => {
    result.header("Access-Control-Allow-Origin", "*");
    result.json(infos);
  })
}

module.exports = getAllProducts;
