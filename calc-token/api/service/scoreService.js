const User = require('../model/user')
const TokenPlanTask = require('../model/tokenPlanTask')
const TokenApply = require('../model/tokenApply')
const TokenFlow = require('../model/tokenFlow')

const sequelize = require('../common/db');

exports.applyToken = async (userId, taskCode, taskId) => {

  const result = sequelize.transaction(async t => {

    let user = await User.findOne({
      where: {
        id: userId
      },
    });

    const planTask = await TokenPlanTask.findOne({ where: { code: taskCode } })
    const amount = Number.parseFloat(planTask.amount);

    const apply = await TokenApply.create({
      taskCode: planTask.code,
      taskId: taskId,
      quantity: 1,
      unitReward: amount,
      reward: amount,
      receiverId: userId,
      status: 2,
      remark: planTask.name
    }, { transaction: t })

    await TokenFlow.create({
      userId: userId,
      amount: amount,
      beforeAmount: user.score,
      afterAmount: (Number.parseFloat(user.score) + amount),
      applyId: apply.id,
      description: apply.remark
    }, { transaction: t })

    await User.update({
      score: (Number.parseFloat(user.score) + amount)
    }, { where: { id: userId, score: user.score } }, { transaction: t });

    return user;
  })
  return result;
}

exports.list = async (userId) => {
  let list = await TokenFlow.findAll({
    where: {
      userId: userId
    },
    "order": [["create_time", "desc"]]
  });
  return list;
}