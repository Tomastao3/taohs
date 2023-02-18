const CONSTANTS = require("./common/constants.js");
const UserService = require("./service/userService")
const BizResult = require("./util/BizResult")

async function inventory(req, res) {
    BizResult.success(res,CONSTANTS.MAX_PRE_REGISTER - req.app.locals.userCount)
}
exports.inventory = inventory