module.exports={
    port: process.env.PORT || 3000,
    pool: {
        connectionLimit: 100,
        host: 'localhost',
        user: 'root',
        password: 'pass',
        database: 'newsappdatabase',
        debug: false
    },
    secret: 'nekidugackistringzakodiranjetokena'
}