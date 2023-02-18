const qrCode = require("qrcode")
const BizResult = require("../util/BizResult")

async function qr(req, res) {
    const qrOptions = {
        type: 'image/png',
        width: req.body.width ? req.body.width : 180,
        color: {
            dark: req.body.color && req.body.color.dark ? req.body.color.dark : '#000000',
            light: req.body.color && req.body.color.light ? req.body.color.light : '#ffffff'
        },
        quality: 1
    }

    qrCode.toDataURL(req.body.url, qrOptions, function (err, url) {
        BizResult.success(res, url);
    })
}
exports.qr = qr