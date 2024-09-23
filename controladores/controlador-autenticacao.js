const db = require('../db.json')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const login = async(req, res) => {
    try{
        const{email, senha} = req.body;
        const lista_clientes = db.clientes

        if(!email || !senha){ // se não existir nada dentro de senha ou não existir nada dentro de email:
            res.send({erro: 'email ou senha não enviado'})
        }

        const cliente  = lista_clientes .find(
            (cliente) => cliente?.email== email
        )
        
        if(!cliente){
            res.status(404).send({error: 'not found'})
        }
        const senhaValida = bcrypt.compareSync(senha, cliente.senha)
        if(!senhaValida){
            res.send({error: 'a senha não é válida'})
        }
        
        console.log(senhaValida)

        const token = jwt.sign(
            {
                nome: cliente.nome,
                email: cliente.email,
                _id: cliente.id
            },
            'jwt_secret_key',
            { expiresIn: 1000*60*60*24*365}
        )
        console.log(token)
        
        res.cookie("TokenAulaBE", token).send({message: 'ok'})
        // console.log(email,senha)
        // res.send({message: 'ok'})
    }catch(e){
        console.log(e)
    }
}
const logout = async(req, res) => {
    res.cookie("TokenAulaBE", "none", expiresIn=5)
    res.send({message: 'o usuário fez logout'})
}


module.exports ={login}