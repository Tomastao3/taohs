const express = require('express')
const BizResult = require("../util/BizResult")
const router = express.Router()

const sendSmsModule = require('../passport/sendSms')
router.post('/sendSms', express.json(), (req, res) => {
    sendSmsModule.sendSms(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
});

const loginModule = require('../passport/login')
router.post('/login', express.json(), (req, res) => {
    loginModule.login(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
});

const logoutModule = require('../passport/logout')
router.post('/logout', express.json(), (req, res) => {
    logoutModule.logout(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
});
module.exports = router