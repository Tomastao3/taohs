const UserService = require("../service/userService")
const BizResult = require("../util/BizResult")

async function logout(req, res) {
    const user = await UserService.getByToken(req.headers.logintoken);
    UserService.updateToken(user.id,null);
    BizResult.success(res);
}
exports.logout = logout