//Route
module.exports = function(sequelize, DataTypes){
    //Defining Games Model
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
        //Asscoiating Games with users
        Games.belongsToMany(models.Users, {through: "User_Wishlist"});
        Games.belongsToMany(models.Users, {through: "User_Library"});
    };
    return Games;
};