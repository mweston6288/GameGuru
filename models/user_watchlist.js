module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const UserWatchlist = sequelize.define("User_Watchlist",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        UserId: DataTypes.INTEGER,
        DeveloperId: DataTypes.INTEGER,
    },{
        timestamps: false
    });

    return UserWatchlist;
};