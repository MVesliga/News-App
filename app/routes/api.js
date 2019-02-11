module.exports=function(express,pool,jwt,secret,bcrypt){

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

            let compare = await bcrypt.compare(req.body.credentials.password,rows[0].password);
            console.log(compare);
            if (compare){

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
        let hash = await bcrypt.hash(req.body.user.password, 10);

        const user = {
            imeKorisnik:req.body.user.ime,
            prezimeKorisnik:req.body.user.prezime,
            email:req.body.user.email,
            username:req.body.user.username,
            password:hash
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
            prioritet: req.body.podatak.prioritet,
            naslov: req.body.podatak.naslov,
            podnaslov: req.body.podatak.podnaslov,
            sadrzajVijest: req.body.podatak.sadrzaj,
            idKategorije: req.body.podatak.kategorija,
            datumObjavljivanja: req.body.podatak.datumObjavljivanja,
            imgUrl: req.body.podatak.urlSlike
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
            prioritet: req.body.podatak.prioritet,
            naslov: req.body.podatak.naslov,
            podnaslov: req.body.podatak.podnaslov,
            sadrzajVijest: req.body.podatak.sadrzaj,
            idKategorije: req.body.podatak.kategorija,
            datumObjavljivanja: req.body.podatak.datumObjavljivanja,
            imgUrl: req.body.podatak.urlSlike
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

    apiRouter.route('/news/:kategorija').get(async function(req,res){
        try {
            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT * FROM vijest JOIN kategorije ON vijest.idKategorije = kategorije.id WHERE kategorije.nazivKategorije=?',req.params.kategorija);
            conn.release();
            res.json({ status: 'OK', vijesti:rows });

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

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

    apiRouter.route('/news/:kategorija').get(async function(req,res){
        try {

            let conn = await pool.getConnection();
            let q = await conn.query('SELECT * FROM vijest WHERE id = ?', req.params.id);
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
    apiRouter.route('/comments').post(async function(req,res){
        const komentar = {
            idKorisnik: req.body.podatak.idKorisnik,
            idVijest: req.body.podatak.idVijest,
           sadrzajKomentar: req.body.podatak.sadrzajKomentar,
           datumObjavljivanja: req.body.podatak.datumObjavljivanja
        }

        try{
            let conn = await pool.getConnection();
            let q = await conn.query('INSERT INTO komentar SET ?',komentar);
            conn.release();
            res.json({status:'OK',insertId:q.insertId});
        }
        catch(e){
            console.log(e);
            res.json({status:'NOT OK'});
        }
    });

    apiRouter.route('/comments/:idVijest').get(async function(req,res){
        try {
            let conn = await pool.getConnection();
            let rows = await conn.query('SELECT korisnici.username,komentar.* FROM komentar JOIN korisnici ON komentar.idKorisnik = korisnici.id WHERE idVijest=?',req.params.idVijest);
            conn.release();
            res.json({ status: 'OK', komentari:rows});

        } catch (e){
            console.log(e);
            return res.json({"code" : 100, "status" : "Error with query"});

        }
    });

    return apiRouter;
};