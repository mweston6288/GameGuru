module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const Games = sequelize.define("Games",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: false,
            primaryKey: true
        },
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