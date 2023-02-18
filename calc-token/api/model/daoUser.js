
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../common/db');
const moment = require('moment');

/**
 * Dao用户
 */
class DaoUser extends Model { }

DaoUser.init({
  id: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  proposalLaunchNum: {
    type: Sequelize.INTEGER,
    field: 'proposal_launch_num',
    allowNull: false,
    defaultValue: 0
  },
  proposalVoteNum: {
    type: Sequelize.INTEGER,
    field: 'proposal_vote_num',
    allowNull: false,
    defaultValue: 0
  },
  discussNum: {
    type: Sequelize.INTEGER,
    field: 'discuss_num',
    allowNull: false,
    defaultValue: 0
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
    tableName: 'dao_user',
    timestamps: false
  }
)

module.exports = DaoUser
