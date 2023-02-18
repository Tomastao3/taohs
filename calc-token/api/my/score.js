const ScoreService = require("../service/scoreService")
const BizResult = require("../util/BizResult")

async function list(req, res) {
    let list = await ScoreService.list(req.user.id);

    BizResult.success(res,list);
}

exports.list = list;