const express = require('express')
const BizResult = require("../util/BizResult")
const router = express.Router()

const getCreatorsModule = require('../creator/getCreators')
router.get("/creator", express.json(), (req, res) => {
    getCreatorsModule.getCreators(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
})

const creatorApplyModule = require('../creator/creatorApply')
router.post("/apply", express.json(), (req, res) => {
    creatorApplyModule.creatorApply(req, res).catch(err => {
        console.log("Unknow Error:" + err)
        BizResult.fail(res, "Unknow Error:" + err)
    })
})

module.exports = router