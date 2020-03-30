module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
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

    UserLibrary.getLibrary = function (userID, cb) {
        UserLibrary.findAll({
            where: {
                UserId: userID
            }
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