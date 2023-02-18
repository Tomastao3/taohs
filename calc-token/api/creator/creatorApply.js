const CreatorApplyService = require("../service/creatorApplyService")
const BizResult = require("../util/BizResult")

async function creatorApply(req, res) {

    req.body.userId = req.user.id
    CreatorApplyService.save(
        req.body
    )
    BizResult.success(res);
}
exports.creatorApply = creatorApply