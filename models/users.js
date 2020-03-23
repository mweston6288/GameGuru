module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("Users",{
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps: false
  });
  User.associate = function(models){
    User.belongsToMany(models.Games, {through: models.User_Wishlist});
    User.belongsToMany(models.Games, {through: "User_Library"});
    User.belongsToMany(models.Developer, {through: "User_Watchlist"});
  };
  return User;
};