module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const UserWishList = sequelize.define("User_Wishlist",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        UserId: DataTypes.INTEGER,
    },{
        timestamps: false
    });

    UserWishList.getWishlist = function(userID, cb){
        UserWishList.findAll({
            where: {
                UserId: userID
            }
        }).then((res)=>{
            const data = [];
            res.forEach((element)=>{
                data.push({id: element.GameId});
            });
            return cb(null, data);
        });
    };

    return UserWishList;
};