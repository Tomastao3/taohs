const { Sequelize, Model,DataTypes} = require('sequelize');
const sequelize = require('../common/db');
const moment = require('moment');

/**
 * 短信
 */
class Sms extends Model {}

Sms.init({
    id : {
        type: Sequelize.INTEGER,
        field: 'id',
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verifyCode: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      content: {
        type: Sequelize.STRING,
        field: 'sms',
        allowNull: false
      },
      reqAddr: {
        type: Sequelize.STRING,
        allowNull: false
      },
      create_time: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: () => moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        get() {
          return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    },
    {
      sequelize: sequelize,
      // 数据库表名称
      tableName: 'i_sms',
      timestamps: false
    }
)

module.exports = Sms
