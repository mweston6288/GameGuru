module.exports = function(sequelize, DataTypes){
    const Developer = sequelize.define("Developer",{
        DeveloperID: DataTypes.INTEGER,
    });

    return Developer;
};