const express = require('express')
const moment = require('moment');
const app = express();
const contextPath = "/api";


const myRouter = require('./api/router/my')
const passportRouter = require('./api/router/passport')
// const creatorRouter = require('./api/router/creator')
const commonRouter = require('./api/router/common')
const BizResult = require("./api/util/BizResult")

const UserService = require("./api/service/userService")

app.use('/', express.static('public'))

//token Interceptor
const whiteList = ['/passport/*', '/inventory','/common']
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers",["logintoken"]);
    next();
})
app.use(contextPath, async (req, res, next) => {
    //跨域
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8");

    console.log("["+moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')+"]\""+req.method+" "+req.url+"\" ["+req.ip+"]");  

    if(!req.app.locals.userCount){
        let count = await UserService.count();
        req.app.locals.userCount = count;
    }

    //token校验
    if (whiteList.filter(e => { return new RegExp(e).test(req.url); }).length == 0) {
        //TODO 改成jwt
        if (req.headers.logintoken == undefined || req.headers.logintoken == "") {
            BizResult.unauthorized(res);
            return;
        }

        let user = await UserService.getByToken(req.headers.logintoken)
        if (user == null) {
            BizResult.unauthorized(res);
            return;
        }
        req.user = user;
    }
    next();
})

const getUserCountModule = require('./api/inventory')
app.get("/api/inventory", express.json(), (req, res) => { getUserCountModule.inventory(req, res) })

// const contractFormModule = require('./api/contractForm');
// const e = require('express');
// app.post("/api/contractForm", express.json(), (req, res) => { contractFormModule.contractForm(req, res) })


app.use(contextPath + '/passport', passportRouter);
app.use(contextPath + '/my', myRouter);
// app.use(contextPath + '/creator', creatorRouter);
app.use(contextPath + '/common', commonRouter);

process.on('uncaughtException',function(err){
    console.log("uncaughtException:"+err)
})
process.on('unhandledRejection',function(err,promise){

    console.log("unhandledRejection:"+err)
} )
app.listen(8888);
