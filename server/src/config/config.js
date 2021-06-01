module.exports ={
    port: process.env.PORT || 8081,
    authentification: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}
