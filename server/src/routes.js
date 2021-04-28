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

    //view particular vulnerability
    app.get('/vulnerabilities/:vulnerabilityId', 
    VulnerabilitiesController.show)

    app.post('/vulnerabilities', 
    VulnerabilitiesController.post)
    
    //edit a particular vulnerability
    app.put('/vulnerabilities/:vulnerabilityId', 
    VulnerabilitiesController.put)
}
