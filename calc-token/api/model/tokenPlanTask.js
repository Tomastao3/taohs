
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../common/db');

/**
 * 计划任务
 */
class TokenPlanTask extends Model { }

TokenPlanTask.init({
  id: {
    type: Sequelize.INTEGER,
    field: 'id',
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
},
  {
    sequelize: sequelize,
    // 数据库表名称
    tableName: 'dao_token_plan_task',
    timestamps: false
  }
)

module.exports = TokenPlanTask