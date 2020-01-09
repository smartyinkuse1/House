module.exports = (app)=>{
const multer = require('multer');
const { verify, verify1 }= require('../validation/verify')
const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error('Invalid Mime Type')
        if (isValid) {
            error = null
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype]
        cb(null, name + '-' + Date.now() + '-' + ext)
    }
})

    const control = require('../controller/controller')
    app.post('/api/sign',control.signin)
    app.post('/api/signs',control.signinS)
    app.post('/api/login', control.login)
    app.post('/api/create', verify, multer({storage:storage}).single('image'), control.create)
    app.get('/api/houses', control.getHouses)
    app.get('/api/revHouses', control.getRevHouses)
    app.get('/api/allHouses', control.getAllHouses)
    app.get('/api/house/:id', control.getHouse)
    app.delete('/api/houseDel/:houseId',verify,  control.delete)
    app.put('/api/houseUp/:houseId', verify, multer({storage:storage}).single('image'), control.update)
    app.post('/api/crequest', control.createRequest)
    app.get('/api/lrequest',verify1, control.getRequests)
    app.get('/api/request/:requestId', control.getRequest)
    app.delete('/api/requestDel/:requestId', control.delRequest)
    app.post('/api/login', control.login)

} 