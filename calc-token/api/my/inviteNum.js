const UserService=require("../service/userService")
const BizResult = require("../util/BizResult")

async function count(req, res) {
    const count=await UserService.countByInvitedBy(req.user.inviteCode);

    BizResult.success(res,count);
}

exports.count = count;