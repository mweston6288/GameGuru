const db = require("../models");

module.exports = (app) => {
  app.get("https://api.rawg.io/api/games", (req, res) => {
    let devQuery = {};
    if (req.devQuery.developer_id) {
      devQuery.DeveloperId = req.devQuery.developer_id;
    }
    let pubQuery = {};
    if (req.pubQuery.publisher_id) {
      pubQuery.PublisherId = req.publisher_id.publisher_id;
    }
    db.Games.findAll({
      where: devQuery, pubQuery,
      include: [db.Developer] [db.Publisher]
    }).then((dbGames) => {
      res.json(dbGames);
    });
  });

  app.get("https://api.rawg.io/api/games/:name", (req, res) => {
    let devQuery = {};
    if (req.devQuery.developer_id) {
      devQuery.DeveloperId = req.devQuery.developer_id;
    }
    let pubQuery = {};
    if (req.pubQuery.publisher_id) {
      pubQuery.PublisherId = req.publisher_id.publisher_id;
    }
    db.Games.findOne({
      where:  {
        name: req.params.name
      },
      devQuery, pubQuery,
      include: [db.Developer] [db.Publisher]
    }).then((dbGames) => {
      res.json(dbGames);
    });
  });


};