module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const Games = sequelize.define("Games",{
        gameID: DataTypes.INTEGER,
        platformsID: DataTypes.INTEGER,
        storeID: DataTypes.INTEGER,
        developergameID: DataTypes.INTEGER,
        genresID: DataTypes.INTEGER,
        tagID:DataTypes.INTEGER,
        publishergameID:DataTypes.STRING,
    },{
        timestamps: false
    });
    Games.associate = function(models){
        console.log(models);
        //Games.belongsToMany(models.Platforms, {through: "Games_Platform"});
            Games.belongsToMany(models.Users, {through: "User_Wishlist"});
            Games.belongsToMany(models.Users, {through: "User_Library"});
            Games.belongsTo(models.Developer,{
            foreignKey: {
                allowNull: false
            }});
            Games.belongsTo(models.Publisher,{
            foreignKey: {
                allowNull: false
            }});
};
    return Games;
};
    	

