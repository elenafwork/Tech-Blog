const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {};

Post.init(     
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    content: {
        type: DataTypes.STRING,
        allowNull:false
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    created_on: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updated_on: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
      
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports =Post;