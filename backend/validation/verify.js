const jwt = require('jsonwebtoken');
const User = require('../model/user')
const verify = (req, res, next)=>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    const verified =  jwt.verify(token, process.env.SECRET_KEY1)
    req.userData = {userId: verified.id}
    next()
} catch (error) {
    res.status(401).send({message: error + "auth failed"})
}

}
const verify1 = async (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token)
        const verified =  jwt.verify(token, process.env.SECRET_KEY1)
        const que = {username: verified.username}
        // console.log(que);
        user =  await User.findOne(que)
        if (user.role === 'superuser'){
            next()
        }else{
            console.log('hi')
            return res.status(401).send({message: error + "auth failed"})
        }
        // req.userData = {userId: verified.id}
    } catch (error) {
        res.status(401).send({message: error + "auth failed"})
    }
}
module.exports.verify = verify;
module.exports.verify1 = verify1