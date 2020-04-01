//Routes
module.exports = function(sequelize, DataTypes){
    // Defining the User_Wishlist Model
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
    //Finding User_Wishlist by user Id
    UserWishList.getWishlist = (userID, cb) => {
        UserWishList.findAll({
            where: {
                UserId: userID
            }
            //Then Creating an array and pushing GameId in to it
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