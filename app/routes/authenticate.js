module.exports=function(express,pool,jwt, secret){
    let authRouter = express.Router();

    authRouter.post('/',async function(req,res){
        
        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM users WHERE username=?', req.body.credentials.username);
            conn.release();

            if (rows.length>0 && rows[0].password==req.body.credentials.password){

                const token = jwt.sign({
                    username:rows[0].username,
                    email:rows[0].email
                }, secret, {
                    expiresIn:3600
                });

                res.json({ status: 'OK', token:token, user:rows[0]});

            } else if (rows.length>0){

                res.json({ status: 'NOT OK', description:'Wrong password' });

            } else {

                res.json({ status: 'NOT OK', description:'Username doesnt exist' });

            }


        } catch (e){

            return res.json({"code" : 100, "status" : "Error with query"});

        }
    });

    return authRouter;
}