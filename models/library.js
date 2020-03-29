module.exports = function(sequelize, DataTypes){
    // pass in id, Name, description, Released, Metacritic, background_image, esrb_rating.name
    const User_Library = sequelize.define("User_Library",{
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

    return User_Library;
};