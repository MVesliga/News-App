module.exports=function(express,pool,jwt,secret){

    const apiRouter = express.Router();

    apiRouter.get('/',(req,res) => {
        res.json({message: 'Dobro dosli na api!'});
    });

    apiRouter.post('/login',async function(req,res){
        
        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM korisnici WHERE username=?', req.body.credentials.username);
            conn.release();
            console.log('Log u apiju za login');

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

    apiRouter.route('/register').post(async function(req,res){
        const user = {
            imeKorisnik:req.body.user.ime,
            prezimeKorisnik:req.body.user.prezime,
            email:req.body.user.email,
            username:req.body.user.username,
            password:req.body.user.password
        }

        try{
            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO korisnici SET ?',user);
            conn.release();
            console.log("Registracija usera: " + user.username);
            res.json({status:'OK',insertId:q.insertId});
        }
        catch(e){
            console.log(e);
            res.json({status:'NOT OK'});
        }
    });
    
    apiRouter.route('/news').get(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM vijest');
            conn.release();
            res.json({ status: 'OK', vijesti:rows });

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }
    }).post(async function(req,res){
        const vijest = {
            prioritet: req.body.vijest.prioritet,
            naslov: req.body.vijest.naslov,
            podnaslov: req.body.vijest.podnaslov,
            sadrzajVijest: req.body.vijest.sadrzaj,
            idKategorije: req.body.vijest.kategorija,
            idPotkategorije: req.body.vijest.potkategorija,
            datumObjavljivanja: req.body.vijest.datumObjavljivanja,
            imgUrl: req.body.vijest.urlSlike
        }

        try{
            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO vijest SET ?',vijest);
            conn.release();
            res.json({status:'OK',insertId:q.insertId});
        }
        catch(e){
            console.log(e);
            res.json({status:'NOT OK'});
        }
    }).put(async function(req,res){

        const vijest = {
            prioritet: req.body.vijest.prioritet,
            naslov: req.body.vijest.naslov,
            podnaslov: req.body.vijest.podnaslov,
            sadrzajVijest: req.body.vijest.sadrzaj,
            idKategorije: req.body.vijest.kategorija,
            idPotkategorije: req.body.vijest.potkategorija,
            datumObjavljivanja: req.body.vijest.datumObjavljivanja,
            imgUrl: req.body.vijest.urlSlike
        }

        try {
            let conn = await pool.getConnection();
            let q = await conn.query('UPDATE vijest SET ? WHERE id = ?', [vijest,req.body.vijest.id]);
            conn.release();
            res.json({ status: 'OK', changedRows:q.changedRows });
            console.log(q);
        } catch (e){
            res.json({ status: 'NOT OK' });
        }
    });

    apiRouter.route('/news/:id').delete(async function(req,res){

        try {

            let conn = await pool.getConnection();
            let q = await conn.query('DELETE FROM vijest WHERE id = ?', req.params.id);
            conn.release();
            res.json({ status: 'OK', affectedRows :q.affectedRows });

        } catch (e){
            res.json({ status: 'NOT OK' });
        }


    });

    apiRouter.route('/users/:id').get(async function(req,res){
        try {

            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM korisnici WHERE id=?',req.params.id);
            conn.release();
            res.json({ status: 'OK', user:rows[0]});

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }
        
    });

    return apiRouter;
};