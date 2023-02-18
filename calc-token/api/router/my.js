const express = require('express')
const BizResult = require("../util/BizResult")
const router = express.Router()

const infoModule = require('../my/info')
router.get("/info", express.json(), (req, res) => {
    infoModule.info(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
})

const myScoreModule = require('../my/score')
router.get("/score", express.json(), (req, res) => {
    myScoreModule.list(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
});

const inviteNumModule = require('../my/inviteNum')
router.get("/inviteNum", express.json(), (req, res) => {
    inviteNumModule.count(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
});
module.exports = router