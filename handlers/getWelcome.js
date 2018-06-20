const aboutService = require("./../services/aboutService");

function getWelcome(request, result) {
  aboutService.getTeamDescription()
  .then(info => {
    result.json(info);
  });
}

module.exports = getWelcome;
