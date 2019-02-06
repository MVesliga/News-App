module.exports=function(express,pool){

    const apiRouter = express.Router();

    apiRouter.get('/',(req,res) => {
        res.json({message: 'Dobro dosli na api!'});
    });

    return apiRouter;
};