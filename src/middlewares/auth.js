const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).send({error : 'No token provided'});

    const parts = authHeader.split(' ');

    if(!parts.length === 2)
        return res.status(401).send({error : 'Token Error'})


    const [ scheme, token] = parts

    if(scheme.search(/Bearer/i) === -1)
        return res.status(401).send({error: 'Token malformatted'});
    
    jwt.verify(token,process.env.SECRET, (err,decod) => {
        if(err)
            return res.status(401).send({error : 'Token Invalido'});

        console.log("Token Verificado")
        req.userId = decod.id;
        next();
    });
}