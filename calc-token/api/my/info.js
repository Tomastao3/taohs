const BizResult = require("../util/BizResult")
async function info(req, res) {
    BizResult.success(res,req.user);
}

exports.info = info