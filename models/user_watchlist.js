//Route
module.exports = function(sequelize, DataTypes){
    //Defining User_Watchlist Model
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
    //Finding Watchlist by user Id
    UserWatchlist.getWatchlist =  (userID, cb) =>  {
        UserWatchlist.findAll({
            where: {
                UserId: userID
            }
            //Then creatting array to push Developer Id into 
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