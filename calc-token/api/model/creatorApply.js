const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../common/db');
const moment = require('moment');

/**
 * 创作者申请
 */
class CreatorApply extends Model { }

CreatorApply.init({
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    field: 'user_id'
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  mobile: {
    type: Sequelize.STRING,
    allowNull: true
  },
  wx: {
    type: Sequelize.STRING,
    allowNull: true
  },
  info: {
    type: Sequelize.STRING,
    allowNull: true
  },
  create_time: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      return moment(this.getDataValue('create_time')).format('YYYY-MM-DD HH:mm:ss');
    }
  }
},
  {
    sequelize: sequelize,
    // 数据库表名称
    tableName: 'i_creator_form',
    timestamps: false
  }
)

module.exports = CreatorApply