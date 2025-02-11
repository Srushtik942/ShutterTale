// models/photo.js

module.exports = (sequelize, DataTypes) => {
    const photo = sequelize.define(
      'photo',
      {
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
        },
        altDescription: {
          type: DataTypes.STRING,
        },
        tags:{
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
        },
        dateSaved: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
        userId: {
          type: DataTypes.INTEGER,
          references: { model: 'users', key: 'id' },
        },
      },
      {
        timestamps: true,
      }
    );

    // Associations
    photo.associate = (models) => {
      // photo.hasMany(models.tags, { through:models.tags, foreignKey: 'photoId' });
      photo.belongsTo(models.users, { foreignKey: 'userId' });

    }

    return photo;
  }