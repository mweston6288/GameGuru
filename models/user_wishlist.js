module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const UserWishList = sequelize.define("User_Wishlist",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        GameId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
        Priority: DataTypes.INTEGER
    },{
        timestamps: false
    });

    return UserWishList;
};