module.exports = function(sequelize, DataTypes){
  const Publisher = sequelize.define("Publisher",{
    DeveloperID: DataTypes.INTEGER,
    title: DataTypes.STRING
  });

  Publisher.associate = function(models){
    Developer.hasMany(models.Games);
  };
  return Developer;
};