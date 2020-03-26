module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const UserWishList = sequelize.define("User_Wishlist",{
        Priority: DataTypes.INTEGER
    },{
        timestamps: false
    });

    return UserWishList;
};