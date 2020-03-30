module.exports = function(sequelize, DataTypes){
    const Publisher = sequelize.define("Publisher",{
        PublisherID: DataTypes.INTEGER,
    });
    /*Publisher.associate = function(models){
        Publisher.hasMany(models.Games);
    };*/
    return Publisher;
};