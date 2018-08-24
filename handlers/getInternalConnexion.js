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
              return result.json({status: "error", errorMessage: "Sorry, you are not authorized to access this page."});
            } if (users.length > 1) {
              return result.json({status: "error", errorMessage: "Apparently, there is a duplicated user in the database"});
            } else {
              if (users[0].type === "IP") {
                // console.log(users[0]);
                return result.json({username: users[0].name, userToken: users[0].token, email: users[0].mail, IP: users[0].type, id: users[0].id});
              } else {
                // console.log("mauvaise adresse mail");
                return result.json({status: "error", errorMessage: "Sorry, only our Product Engineers can access the dashboard page."});
              }
            }
          });
    }
  })
}


module.exports = getInternalConnexion;
