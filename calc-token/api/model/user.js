const { Sequelize, Model,DataTypes} = require('sequelize');
const sequelize = require('../common/db');
const moment = require('moment');

/**
 * 用户
 */
class User extends Model {}

User.init({
    id : {
        type: DataTypes.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verifiedTime: {
        type: DataTypes.DATE,
        allowNull: false,
        // get() {
        //   return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
        // }
      },
      invitedBy: {
        type: DataTypes.STRING,
        allowNull: true
      },
      loginToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      inviteCode: {
        type: DataTypes.STRING,
        allowNull: false
      },
      metamask: {
        type: DataTypes.STRING,
        allowNull: true
      },
      score: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
      },
      create_time: {
        type: DataTypes.DATE,
        allowNull: true,
        // get() {
        //   return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
        // }
      }
    },
    {
      sequelize: sequelize,
      // 数据库表名称
      tableName: 'i_user',
      timestamps: false
    }
)

module.exports = User
