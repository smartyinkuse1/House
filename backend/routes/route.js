module.exports = (app)=>{
    const control = require('../controller/controller')
    app.post('/api/sign',control.signin)
    app.post('/api/login', control.login)
    app.post('/api/create', control.create)
    app.get('/api/houses', control.getHouse)
}