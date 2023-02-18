
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../common/db');
const moment = require('moment');

/**
 * token流水
 */
class TokenFlow extends Model { }

TokenFlow.init({
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: "user_id"
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  beforeAmount: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: "before_amount"
  },
  afterAmount: {
    type: DataTypes.NUMBER,
    allowNull: false,
    field: "after_amount"
  },
  applyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "apply_id"
  },
  description: {
    type: DataTypes.INTEGER,
    field: "description"
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
    tableName: 'dao_token_flow',
    timestamps: false
  }
)

module.exports = TokenFlow
