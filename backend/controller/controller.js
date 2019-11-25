const User = require('../model/user');
const House = require('../model/house');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupValidation, loginValidation, houseValidation } = require('../validation/validation')
const Super = new User({
    email: 'super',
    username: 'super',
    password: 'super',
    role:'superuser'
})
try{

}catch(err){
    
}
exports.signin = async (req, res)=>{
    const {error} = signupValidation(req.body)
    if (error) return res.status(400).send({message: error.details[0].message})
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
    try{
        const Saveduser = await user.save()
        console.log(Saveduser)
        res.send({message:"user created succesfully"})
    }catch(err){
        res.status(400).send({message:err})
    }
}
exports.login = async(req, res) =>{
    const { error } = loginValidation(req.body)
    if(error) return res.status(400).send({message:error.details[0].message})
    const users = await User.findOne({username: req.body.username})
    if(!users) return res.status(400).send({message: 'Inavalid Username'})
    if (users.role === 'superuser'){
        const validpass = await bcrypt.compare(req.body.password, users.password) 
    }
}
exports.create = async(req, res)=>{
    console.warn(req.body)
    const { error } = houseValidation(req.body)
    console.log(error)
    if (error) return res.status(400).send({message: error.details[0].message})
    const house = new House({
       title: req.body.title,
       location:req.body.location,
       description: req.body.description,
       price: req.body.price,
      // landlord: req.params.userId,
       mode: req.body.mode
    })
    try{
        const savedhouse = await house.save()
        // console.warn(savedhouse)
        res.send({message:"House created successfully"})
    }catch(err){
        res.status(404).send({message:err})
    }
}
exports.getHouse = (req, res)=>{
    House.find().then(houses =>{
        res.send(
            {message: 'welcome to house application',
            houses: houses
    })
    console.warn(houses)
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "some errors eccoured while retrieving the houses"
        });
    });
}