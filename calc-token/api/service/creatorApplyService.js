const CreatorApply = require('../model/creatorApply')

exports.save = async (apply) => {
  const result = await CreatorApply.create({
    userId: apply.userId,
    name: apply.name,
    mobile: apply.mobile,
    wx: apply.wx,
    info: apply.info,
  });

  return result;
}

