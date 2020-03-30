module.exports = function(sequelize, DataTypes){
    const Developer = sequelize.define("Developer",{
        DeveloperId: {
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
        Developer.belongsToMany(models.Users, {through: "User_Watchlist"});
    };
    return Developer;
};