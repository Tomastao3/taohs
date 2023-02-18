const { v4: uuidv4 } = require('uuid');
const CONSTANTS = require("../common/constants.js");
const BizResult = require("../util/BizResult")

const UserService = require("../service/userService")
const ScoreService = require("../service/scoreService")
const SmsService = require("../service/smsService")
const axios = require('axios')

async function verifyOTP(mobile, verifyCode) {
    let result = false;
    mobile = mobile.substr(0, 3) == "+86" ? mobile : "+86"+mobile;

    await axios.post('https://msxr87iyfi.execute-api.ap-southeast-1.amazonaws.com/send_otp_update/verify_otp', {
        'body': {
            destinationNumber: mobile,
            otp: verifyCode
        }
    })
        .then(res => {
            console.log('Response: ',res.data)
            result =  res.data.VerificationResponse.Valid;
        })
        .catch(error => {
            console.error('Response Error : ', error)
            result = error;
        });
    return result;
}

async function login(req, res) {
    if (req.app.locals.userCount >= CONSTANTS.MAX_PRE_REGISTER) {
        BizResult.fail(res, "注册人数超限")
        return
    }

    if (req.body.mobile == undefined || req.body.verifyCode == undefined) {
        BizResult.fail(res, "参数不足")
        return
    }
    //验证码判断
    let verifyResult =await verifyOTP(req.body.mobile, req.body.verifyCode);

    if(typeof verifyResult != "boolean"){
        BizResult.fail(res, "程序错误: " + JSON.stringify(verifyResult))
        return
    }

    if (!verifyResult) {
        BizResult.fail(res, "验证码错误")
        return
    }

    let loginToken = uuidv4();
    const user = await UserService.getByMobile(req.body.mobile);
    //login
    if (user != null) {
        UserService.updateToken(user.id, loginToken);
        BizResult.success(res, { "token": loginToken });
        return;
    }

    //register
    let inviteCode = uuidv4();
    let newUser = {
        mobile: req.body.mobile,
        invitedBy: req.body.invitedBy,
        inviteCode: inviteCode,
        loginToken: loginToken
    };

    newUser = await UserService.save(newUser);

    BizResult.success(res, { "token": loginToken });
    req.app.locals.userCount = req.app.locals.userCount + 1;

    //注册送积分
    ScoreService.applyToken(newUser.id, "register", newUser.id);

    //邀请人积分奖励
    if (req.body.invitedBy != undefined) {
        let inviter = await UserService.getByInviteCode(req.body.invitedBy);
        if (inviter != null) {
            ScoreService.applyToken(inviter.id, "invite", newUser.id);
        }
    }
}
exports.login = login