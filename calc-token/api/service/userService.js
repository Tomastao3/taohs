const User = require('../model/user')
const DaoUser = require('../model/daoUser')
const moment = require('moment');
const sequelize = require('../common/db');


exports.save = async user => {

  const result = sequelize.transaction(async t => {
    //add user
    const entity = await User.create({
      mobile: user.mobile,
      invitedBy: user.invitedBy,
      inviteCode: user.inviteCode,
      loginToken: user.loginToken,
      verifiedTime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }, { transaction: t });
    //add dao user
    await DaoUser.create({
      id: entity.id
    }, { transaction: t })

    return entity;
  })
  return result;
}

exports.getByMobile = async mobile => {
  console.log(mobile);
  let user = await User.findOne({
    where: {
      mobile: mobile
    },
  });

  return user;
}

exports.getByInviteCode = async inviteCode => {
  let user = await User.findOne({
    where: {
      inviteCode: inviteCode
    },
  });

  return user;
}

exports.getByToken = async token => {
  let user = await User.findOne({
    where: {
      loginToken: token
    },
  });

  return user;
}


/**
 * 刷新用户Token
 * @param {} userId
 * @param {*} token
 * @returns
 */
exports.updateToken = async (userId, token) => {
  let user = await User.update({
    loginToken: token
  }, {
    where: {
      id: userId
    },
  });

  return user;
}

/**
 * 统计邀请人数
 * @param {*} invitedBy
 * @returns
 */
exports.countByInvitedBy = async invitedBy => {

  let count = await User.count({
    where: {
      invitedBy: invitedBy
    },
  });
  return count;
}


exports.count = async () => {

  let count = await User.count();
  return count;
}
