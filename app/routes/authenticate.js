module.exports=function(express,pool){
    let authRouter = express.Router();

    authRouter.post('/',async function(req,res){
        try{
            let connection = await pool.getConnection();
            let rows = await connection.query('SELECT * FROM users WHERE username=?', req.body.credentials.username);
            connection.release();

            if(rows.length > 0 && rows[0].password==req.body.credentials.password){
                res.json({status: 'OK',user: rows[0]});
            }
            else if(rows.length>0){
                res.json({status: 'NOT OK',description: 'Wrong password'});
            }
            else{
                res.json({status: 'NOT OK',description: 'Username does not exist'});
            }
        }
        catch(e){
            return res.json({"code":100, "status": "Error with query"});
        }
    });

    return authRouter;
}