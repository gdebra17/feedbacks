// const feedbacksService = require("./../services/feedbacksService");
// const usersService = require("./../services/usersService");
const productsService = require("./../services/productsService");

function postNewProduct(request, result) {
  console.log("handlers/postNewProduct:", request.body);
  productsService.addProduct(request.body)
  .then(infos => {
    if (infos.errorMessage) {
      result.json({status: "error", errorMessage: infos.errorMessage});
    } else {
      result.json({status: "succeeded", data: infos});
    }
  })
}

module.exports = postNewProduct;
