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
    },{
        timestamps: false
    });
    UserWatchlist.getWatchlist = function (userID, cb) {
        UserWatchlist.findAll({
            where: {
                UserId: userID
            }
        }).then((res) => {
            const data = [];
            res.forEach((element) => {
                data.push({ id: element.DeveloperId });
            });
            return cb(null, data);
        });
    };

    return UserWatchlist;
};