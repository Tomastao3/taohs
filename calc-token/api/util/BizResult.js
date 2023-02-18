/**
 * 统一返回结果
 */
class BizResult {
    /**
         * 返回code
         */
    code;
    /**
     * 返回消息
     */
    msg;
    /**
     * 返回数据
     */
    data;
    /**
     * 返回时间
     */
    time;

    /**
     *
     * @param code {number} 返回code
     * @param msg {string} 返回消息
     * @param data {any} 返回具体对象
     */
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.time = Date.now();
    }

    /**
     * 成功
     * @param data {any} 返回对象
     * @return {BizResult}
     */
    static success(res, data) {
        res.json(new BizResult(200, "success", data));
    }

    static fail(res, msg) {
        res.json(new BizResult(500, msg))
    }
    static illegalArgument(res, data) {
        res.json(new BizResult(400, "illegal argument", data))
    }
    static unauthorized(res, msg = "用户未登录或登录已过期") {
        res.json(new BizResult(401, msg))
    }
}
module.exports = BizResult;
