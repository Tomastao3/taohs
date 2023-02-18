const Sms = require('../model/sms')
const moment = require('moment');


exports.save = async sms => {
  //
  const entity = await Sms.create({
    mobile: sms.mobile,
    content: sms.content,
    verifyCode: sms.verifyCode,
    reqAddr: sms.reqAddr,
    create_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  });

  return entity;
}

exports.getByMobile = async mobile => {
  let sms = await Sms.findOne({
    where: {
      mobile: mobile
    },
    "order": [["create_time", "desc"]]
  });

  return sms;
}

exports.countByMobile = async mobile => {
  console.log(mobile);
  let count = await Sms.count({
    where: {
      mobile: mobile
    },
  });

  return count;
}

exports.countByIP = async ip => {
  let count = await Sms.count({
    where: {
      reqAddr: ip
    },
  });

  return count;
}


