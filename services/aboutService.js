const db = require('./../models/index');
const operator = db.sequelize.Op;


function getTeamDescription() {
  const teamName = process.env.TEAM_NAME;
  const creatorList = [];

  return db.creators.findAll({raw: true})
  .then(creators => {
    //console.log("values=", values);
    creators.forEach(creator => {
      //console.log("value.name=", value.name);
      creatorList.push({
        id: creator.id,
        name: creator.name,
        email: creator.email,
        description: creator.description,
        urlPhoto: creator.url_photo,
      });
    });
    return creatorList;
  })
  .then(creatorList => {
    console.log("creatorList=", creatorList);
    return {teamName, creatorList};
  });
}

function getTeamDescriptionByIdList(idList) {
  const creatorList = [];

  return db.creators.findAll({
    where: {
      id: { [operator.or]: idList }
    },
    raw: true
  })
  .then(creators => {
    //console.log("values=", values);
    creators.forEach(creator => {
      creatorList.push({
        id: creator.id,
        name: creator.name,
        email: creator.email,
      });
    });
    return {creatorList};
  });
}

module.exports = {
  getTeamDescription: getTeamDescription,
  getTeamDescriptionByIdList: getTeamDescriptionByIdList,
}
