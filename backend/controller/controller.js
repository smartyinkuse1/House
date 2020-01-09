const User = require('../model/user');
const House = require('../model/house');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation, houseValidation } = require('../validation/validation')
const Request = require('../model/request')
// const Super = new User({
//     email: 'super',
//     username: 'super',
//     password: 'super',
//     role:'superuser'
// })
exports.signin = async (req, res)=>{
    // const {error} = signupValidation(req.body)
    // if (error) return res.status(400).send({message: error.details[0].message})
    const userNameExist = await User.findOne({username:req.body.username})
    if (userNameExist) return res.status(400).send({message:'Username already exist'})
    const hashedpassword = await bcrypt.hash(req.body.password, 10)
    
    const user = new User({
        firstName:req.body.firstname,
        lastName:req.body.lastname,
        email:req.body.email,
        username: req.body.username,
        password:hashedpassword, 
        role:"user"
    })
        user.save().then(user =>{
        res.send({message:"user created succesfully",
    User:user})})
        .catch(err=>{
        res.status(400).send({message:err})
    })
}
exports.signinS = async (req, res)=>{
    // const {error} = signupValidation(req.body)
    // if (error) return res.status(400).send({message: error.details[0].message})
    // const userNameExist = await User.findOne({username:req.body.username})
    // if (userNameExist) return res.status(400).send({message:'Username already exist'})
    const hashedpassword = await bcrypt.hash('super', 10)
    
    const user = new User({
        firstName:'super',
        lastName:'super',
        email:req.body.email,
        username: 'super',
        password:hashedpassword, 
        role:"superuser"
    })
        user.save().then(user =>{
        res.send({message:"user created succesfully",
    User:user})})
        .catch(err=>{
        res.status(400).send({message:err})
    })
}
exports.login = async(req, res) =>{
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send({message:error.details[0].message})
    const users = await User.findOne({username: req.body.username})
    if(!users) return res.status(400).send({message: 'Inavalid Username'})
    if (users.role === 'user'){
        const validpass = await bcrypt.compare(req.body.password, users.password)
        // console.log(validpass) 
        if(!validpass) return res.status(400).send({message: 'Incorrect password!!'})
        const token = jwt.sign({username: users.username, id:users._id}, process.env.SECRET_KEY1)
        res.status(200).send({
            token: token,
            expiresIn: 3600,
            userId: users._id,
            user: users.username
        })
    }
    if (users.role === 'superuser'){
        const validpass = await bcrypt.compare(req.body.password, users.password)
        // console.log(validpass) 
        if(!validpass) return res.status(400).send({message: 'Incorrect password!!'})
        const token = jwt.sign({username: users.username, id:users._id}, process.env.SECRET_KEY1)
        res.status(200).send({
            token: token,
            expiresIn: 3600,
            userId: users._id,
            user: users.username
        })    
    }
}
exports.create = async(req, res)=>{
    // console.warn(req.userData)
    const { error } = houseValidation(req.body)
    if (error) return res.status(400).send({message: error.details[0].message})
    const url = req.protocol + '://' + req.get('host');
    const house = new House({
       title: req.body.title,
       location:req.body.location,
       description: req.body.description,
       price: req.body.price,
       landlord: req.userData.userId,
       mode: req.body.mode,
       imagePath: url + '/images/' + req.file.filename
    })
    house.save().then(savedhouse =>{
        res.send({message:"House created successfully",
    house : {
        id: savedhouse._id,
        title: savedhouse.title,
        location: savedhouse.location,
        price: savedhouse.price,
        mode: savedhouse.mode,
        imagePath: savedhouse.imagePath
} })
    })
    // .catch(err =>{
    //     res.status(404).send({message:err})
    // }
}
exports.getHouses = (req, res)=>{
    const pageSize =  +req.query.pagesize
    const currentPage = +req.query.page
    let postQuery = House.find()
    let Houses;
    if(pageSize && currentPage){
        postQuery.skip(pageSize*(currentPage-1))
        .limit(pageSize)
    }

    postQuery.then(houses =>{
        Houses = houses
        return House.count()
    }).then(count=>{
        res.send(
            {message: 'welcome to house application',
            houses: Houses,
            maxHouses: count
    })
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "some errors eccoured while retrieving the houses"
        });
    });
}
exports.getRevHouses = (req, res)=>{
    const pageSize =  +req.query.pagesize
    const currentPage = +req.query.page
    let postQuery = House.find().sort('-date')
    let Houses;
    if(pageSize && currentPage){
        postQuery.skip(pageSize*(currentPage-1))
        .limit(pageSize)
    }

    postQuery.then(houses =>{
        Houses = houses
        return House.count()
    }).then(count=>{
        res.send(
            {message: 'welcome to house application',
            houses: Houses,
            maxHouses: count
    })
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "some errors eccoured while retrieving the houses"
        });
    });
}
exports.getAllHouses = (req, res)=>{
   House.find().then(houses => {
    res.send({
        message: 'Houses retrieved sucessfully',
        houses: houses
    })
   })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "some errors eccoured while retrieving the houses"
        });
    });
}
exports.getHouse = (req, res)=>{
    House.findById({_id:req.params.id}).then(house=>{
        if (house) {res.status(200).send(house)}
        else{res.status(404).send({message:"House not found!"})}
    })

}
exports.delete = (req, res)=>{
    House.deleteOne({_id: req.params.houseId, landlord: req.userData.userId})
    .then((result)=>{
        if (result.n > 0) {
            res.status(200).send({message: "House Deleted successfully"})
        } else {
            res.status(401).send({message: "Not Authorized"})
        }
    }).catch(err=>{
        res.status(404).send({message: err})
    })
}
exports.update = (req, res)=>{
    const { error } = houseValidation(req.body)
    if (error) return res.status(400).send({message: error.details[0].message})
    let imagePath = req.body.imagePath;
    if (req.file){
        const url = req.protocol + '://' + req.get('host')
        imagePath = url + "/images/" + req.file.filename
    }
    const house = new House({
        _id: req.body.id,
       title: req.body.title,
       location:req.body.location,
       description: req.body.description,
       price: req.body.price,
       landlord: req.userData.userId,
       mode: req.body.mode,
       imagePath: imagePath
    })
    House.updateOne({_id: req.params.houseId, landlord: req.userData.userId }, house).then(result=>{
        if (result.n > 0) {
            res.status(200).send({message: "House updated successfully"})
        } else {
            res.status(401).send({message: "Not Authorized"})
        }
       
    }).catch(err=>{
        res.status(400).send({message: err})
    })
}
exports.createRequest = async(req, res) => {
    // const hashedpassword = await bcrypt.hash(req.body.Password, 10)
    const request = new Request({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Telephone: req.body.Telephone,
        Address: req.body.Address,
        email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password
    })
    request.save().then(savedRequest =>{
        res.send({
            message: "Request created successfully",
            request:savedRequest})
    }).catch(err=>{
        res.status(400).send({message: err})
    })
}
exports.getRequests = (req, res) => {
    Request.find().then(requests=>{
        res.send({
            message: "Requests collected successfully",
            requests: requests
        })
    })
    .catch(err =>{
        res.status(500).send({
            message: err.message || "some errors eccoured while retrieving the requests"
        });
    });
}
exports.getRequest = (req, res)=>{
    Request.findById({_id:req.params.requestId}).then(request=>{
        if (request) {res.status(200).send({message: "request gotten succesfully",
        request: request})}
        else{res.status(404).send({message:"Error in retreiving Request"})}
    })

}
exports.delRequest = (req, res)=>{
    Request.deleteOne({_id: req.params.requestId})
    .then(()=>{
        res.send({message:"request deleted succesfully"})
    }).catch(err=>{
        res.status(404).send({message: err})
    })
}