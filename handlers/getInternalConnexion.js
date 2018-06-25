const usersService = require("./../services/usersService");

function getInternalConnexion(request, result) {
  console.log("handlers/getInternalConnexion:", request.body);
  const emailToCheck = request.body.email;

  return usersService.getUserByEmail(emailToCheck)
  .then(users => {
    //console.log("handlers/postNewMessage:", feedbackHeader);
    if (users.length === 0) {
      return result.json({status: "error", errorMessage: "user not authorized"});
    } if (users.length > 1) {
      return result.json({status: "error", errorMessage: "problem in database"});
    } else {
      if (users[0].type === "IP") {
        console.log("getUserByEmail: email=", emailToCheck, " OK !!!");
        return result.json({username: users[0].name, userToken: users[0].token});
      } else {
        return result.json({status: "error", errorMessage: "You are not authorized to access this website !!! You must be a product engineer."});
      }
    }
  });
}

module.exports = getInternalConnexion;
