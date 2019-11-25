const Joi = require('@hapi/joi');
const signupValidation = data =>{
    const schema ={
        firstName:Joi.string().min(3),
        lastName:Joi.string().min(3),
        email:Joi.string().email().required(),
        username:Joi.string().min(1).required(),
        password:Joi.string().min(4).required()
    }
    return Joi.validate(data, schema)
}
const loginValidation = data =>{
    const schema={
        username: Joi.string().min(1).required(),
        password: Joi.string().min(4).required()
    }
    return Joi.validate(data, schema)
}
const houseValidation = data =>{
    const schema={
        id:Joi.number(),
        title: Joi.string(),
        location: Joi.string(),
        description: Joi.string(),
        price: Joi.string(),
        mode: Joi.string()
        // description:Joi.string().min(5)

    }
    return Joi.validate(data, schema)
}
module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
module.exports.houseValidation = houseValidation;