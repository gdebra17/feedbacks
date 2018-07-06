const fetch = require("node-fetch");
const usersService = require("./../services/usersService");

function getInternalConnexion(request, result) {
  const id_token = request.headers.authorization;

  fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`)
    .then((result) => result.json())
    .then((resp) => {
      console.log("resp dans getInternalConnexion ", resp)
      if (resp.aud === process.env.REACT_APP_GOOGLE_KEY_HTML
        && resp.iss === ("accounts.google.com" || "https://accounts.google.com")
        && resp.exp > (new Date()/1000)) {
        console.log("Token encore valide pendant ",Math.round((resp.exp - new Date()/1000)/60)," minutes.");
        return usersService.getUserByEmail(resp.email)
          .then(users => {
            if (users.length === 0) {
              return result.json({status: "error", errorMessage: "user not authorized"});
            } if (users.length > 1) {
              return result.json({status: "error", errorMessage: "problem in database"});
            } else {
              if (users[0].type === "IP") {
                // console.log(users[0].type);
                return result.json({username: users[0].name, userToken: users[0].token, email: users[0].mail});
              } else {
                // console.log("mauvaise adresse mail");
                return result.json({status: "error", errorMessage: "You are not authorized to access this website !!! You must be a product engineer."});
              }
            }
          });
    }
  })
}


module.exports = getInternalConnexion;
