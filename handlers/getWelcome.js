const aboutService = require("./../services/aboutService");

function getWelcome(request, result) {
console.log("getWelcome");

  request.session.views++;
  console.log("request.session.views=", request.session.views);

  aboutService.getTeamDescription()
  .then(info => {
    result.json(info);
  });
}

module.exports = getWelcome;
