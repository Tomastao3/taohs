const SmsService = require("../service/smsService")
const BizResult = require("../util/BizResult")
const axios = require('axios')

async function sendSmsToMobile(mobile) {
    mobile = mobile.substr(0, 3) == "+86" ? mobile : "+86"+mobile;

    const data = {
        'body': {
            destinationNumber: mobile
        }
    }

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let otpResult = null;
    await axios
        .post('https://msxr87iyfi.execute-api.ap-southeast-1.amazonaws.com/send_otp_update/send_otp', JSON.stringify(data), config)
        .then(res => {
            console.log('Response', res.data)
            otpResult = res.data;
        })
        .catch(error => {
            console.error('Error : ', error)
            otpResult = error;
        })
    return otpResult;
}

async function sendSms(req, res) {
    if (req.body.mobile == undefined) {
        BizResult.fail(res,"手机号是必填");
        return;
    }

    let mobileCount = await SmsService.countByMobile(req.body.mobile);
    let ipCount = await SmsService.countByIP(req.socket.remoteAddress);

    console.log("mobileCount:" + mobileCount);
    console.log("ipCount:" + ipCount);

    if (ipCount > 50 || mobileCount > 50) {
        BizResult.fail(res,"短信发送超限");
        return;
    }

    let otpResult =await sendSmsToMobile(req.body.mobile);

    if(JSON.stringify(otpResult).includes(200) && JSON.stringify(otpResult).includes('SUCCESSFUL')){
        let sms = {
            mobile: req.body.mobile,
            content: JSON.stringify(otpResult),
            reqAddr: req.socket.remoteAddress
        };
        sms = SmsService.save(sms);

        BizResult.success(res,"短信发送成功");
    }else {
        BizResult.fail(res,"短信发送失败: " + JSON.stringify(otpResult));
    }

}
exports.sendSms = sendSms;