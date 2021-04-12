module.exports ={
    port: process.env.PORT || 8081,
    db :  {
        database: process.env.DB_NAME || 'certekium',
        user: process.env.DB_USER || 'certekium',
        password: process.env.DB_PASS || 'certekium',
        options:{
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './certekium.sqlite'

        }
    }
}
