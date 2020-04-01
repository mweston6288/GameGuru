//Route
module.exports = function(sequelize, DataTypes){
    //Defining User_Library Model
    const UserLibrary = sequelize.define("User_Library",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        GameId: DataTypes.INTEGER,
        UserId: DataTypes.INTEGER,
    },{
        timestamps: false
    });
    //Finding User_Library by user Id
    UserLibrary.getLibrary = function (userID, cb) {
        UserLibrary.findAll({
            where: {
                UserId: userID
            }
            //Then Creating array and pushing GameId into it
        }).then((res) => {
            const data = [];
            res.forEach((element) => {
                data.push({ id: element.GameId });
            });
            return cb(null, data);
        });
    };

    return UserLibrary;
};