module.exports = function(sequelize, DataTypes){

        const Developer = sequelize.define("Developer",{
            DeveloperID: DataTypes.INTEGER,
    });
        Developer.associate = function(models){
        Developer.hasMany(models.Games);
    };
    return Developer;
};