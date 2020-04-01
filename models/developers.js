//Route
module.exports = function(sequelize, DataTypes){
    //Defining Developer Model
    const Developer = sequelize.define("Developer",{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            autoIncrement: false,
            primaryKey: true,
        },
    },{
        timestamps: false
    });
    Developer.associate = (models) => {
        // Associating Developer with users
        Developer.belongsToMany(models.Users, {through: "User_Watchlist"});
    };
    return Developer;
};