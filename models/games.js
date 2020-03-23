module.exports = function(sequelize, DataTypes){
  // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
  const Games = sequelize.define("Games",{
    gameID: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.DATE,
    score: DataTypes.INTEGER,
    image:DataTypes.STRING,
    ESRB:DataTypes.STRING
  });
  Games.associate = function(models){
    Games.belongsToMany(models.Platforms, {through: "Games_Platform"});
    Games.belongsToMany(models.User, {through: "User_Wishlist"});
    Games.belongsToMany(models.User, {through: "User_Library"});
    Games.hasOne(Developer);
    Games.hasOne(Publisher);
  };
  return Games;
};