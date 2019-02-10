const User = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function createToken(params) {
    return jwt.sign(params, process.env.SECRET , { expiresIn: 300 })
}

const user = async (req,res) => {
    const id = req.userId
    const user = await User.findById(id);
    if(!user)
        return res.status(404).send({error: 'usuario nao encontrado'})
    return res.status(200).json(user);
}

const login = async (req,res) => {
    const { username ,password } = req.body;
    const user = await User.findOne({username});
    
    if(!user)
        return res.status(404).send({error: 'usuario inexistente'})

    const match = await bcrypt.compare( password, user.password)
    
    if(!match)  
        return res.status(400).send({error: 'senha errada'});

    console.log(user._id)
    const token = createToken({id: user._id});
    user.password = undefined;
    return res.status(200).json({user,token: token})
}

const store = async (req, res) => {
    const { username, password } = req.body;
    
    if(!await User.findOne( {username} )) {
        const hash = await bcrypt.hash( password, 10 )
        const user = await User.create({ username, password: hash });
        user.password = undefined;
        const token = createToken({id: user._id});
        return res.status(200).json({user,token: token})
    }

    return res.status(404).send({error: 'Usuario existente'})
}

module.exports = {
    login,store,user
};