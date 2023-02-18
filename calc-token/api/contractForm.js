const dbpool = require('./common/dbpool');
const pool =  dbpool.pool
function contractForm(req,res){
    pool.getConnection(function(poolErr, con) {
        if(poolErr)throw poolErr

        req.body.user_id = req.user.id;
        var query = 'INSERT INTO i_creator_form SET ' + con.escape(req.body)
        con.query(query,(err,result)=>{
            if(err){
              con.release();
              throw err;
            }

            res.json({code : 200
            })

            con.release();
        });

    })
}
exports.contractForm = contractForm