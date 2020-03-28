module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const Games = sequelize.define("Games",{
        gameID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER
    },{
        timestamps: false
    });
    Games.associate = function(models){
        console.log(models);
        //Games.belongsToMany(models.Platforms, {through: "Games_Platform"});
        Games.belongsToMany(models.Users, {through: "User_Wishlist"});
        Games.belongsToMany(models.Users, {through: "User_Library"});
    };
    return Games;
};