const express = require('express')
const BizResult = require("../util/BizResult")
const router = express.Router()

const qrModule = require('../util/qr.js')
router.post('/qr', express.json(), (req, res) => {
    qrModule.qr(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
});

module.exports = router