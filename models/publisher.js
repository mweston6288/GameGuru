module.exports = function(sequelize, DataTypes){
  const Publisher = sequelize.define("Publisher",{
    DeveloperID: DataTypes.INTEGER,
    title: DataTypes.STRING
  });

  /*Publisher.associate = function(models){
    Publisher.hasMany(models.Games);
  };*/
  return Publisher;
};