
module.exports = (sequelize,DataTypes) => {
    const users = sequelize.define('users',{
        username: DataTypes.STRING,
        email:DataTypes.STRING
    },{
        timestamps: false
    }
    );
    users.associate = (models) =>{
        users.hasMany(models.photo, {foreignKey: 'userId'});
    }
    return users;
}