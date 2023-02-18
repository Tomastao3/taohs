
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../common/db');
const moment = require('moment');

/**
 * 报酬申请
 */
class TokenApply extends Model { }

TokenApply.init({
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  taskCode: {
    type: Sequelize.STRING,
    allowNull: false,
    field: "task_code"
  },
  taskId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: "task_id"
  },
  quantity: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  unitReward: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: "unit_reward"
  },
  reward: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  receiverId: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: "receiver_id"
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  remark: {
    type: DataTypes.STRING,
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
    tableName: 'dao_token_apply',
    timestamps: false
  }
)

module.exports = TokenApply
