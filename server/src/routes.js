/* eslint-disable no-undef */
const AuthentificationController = require('./controllers/AuthentificationController')
const keywordController = require('./controllers/keyword.controller')
const keywordcontroller = require('./controllers/keyword.controller')
const CvssController = require('./controllers/CvssController')
const CompanyController = require('./controllers/CompanyController')


const AuthentificationControllerPolicy = require('./policies/AuthentificationControllerPolicy')

module.exports = (app) => {
    app.post('/register', 
    AuthentificationControllerPolicy.register,
    AuthentificationController.register)
        
    app.post('/login', 
    AuthentificationController.login)

    app.get('/user/:useremail',
    AuthentificationController.show)

    app.get('/user',
    AuthentificationController.index)

    app.post('/keyword',
    keywordcontroller.post)

    app.get('/keyword', 
    keywordcontroller.index)

    app.get('/keyword_add', 
    keywordcontroller.index_add)

    app.get('/keyword/:keywordId', 
    keywordController.show)

    app.put('/keyword/:keywordId', 
    keywordController.put)

    app.delete('/keyword/:keywordId',
    keywordController.delete)

    app.get('/cvss', 
    CvssController.index)

    app.get('/cvss_count', 
    CvssController.count)

    app.post('/company',
    CompanyController.post)

    app.get('/company',
    CompanyController.index)
}