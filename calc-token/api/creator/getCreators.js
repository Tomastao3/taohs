const dbpool = require('../common/dbpool');
const pool =  dbpool.pool
function getCreators(req,res){
    let query = 'select * from  i_creator  ';
    let params = [];
    let query2 = ' select * from  i_creator join i_user on i_creator.userId  = i_user.id and  i_user.inviteCode = ? ' +
        ' UNION ALL ' +
        ' select * from  i_creator join i_user on i_creator.userId  = i_user.id and  i_user.inviteCode  != ? ';
    let param2 = [req.body.inviteCode,req.body.inviteCode];
    if(req.body.inviteCode != undefined){
        query = query2;
        params = param2;
    }

    pool.getConnection(function(poolErr, con) {
        if(poolErr)throw poolErr
        con.query(query,params,(err,rows)=>{
            if(err){
                con.release();        
                throw err
            }
            res.json({code : 200,
                detail :rows
            })
        con.release();
        });
        
    })
}
exports.getCreators = getCreators