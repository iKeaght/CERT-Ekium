const AuthentificationController = require('./controllers/AuthentificationController')
const AuthentificationControllerPolicy = require('./policies/AuthentificationControllerPolicy')
const VulnerabilitiesController = require('./controllers/VulnerabilitiesController')
module.exports = (app) => {
    app.post('/register', 
    AuthentificationControllerPolicy.register,
    AuthentificationController.register)
        
    app.post('/login', 
    AuthentificationController.login)

    app.get('/vulnerabilities', 
    VulnerabilitiesController.index)

    app.post('/vulnerabilities', 
    VulnerabilitiesController.post)
}
