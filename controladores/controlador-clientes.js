const db = require('../db.json')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const bcryptjs = require('bcryptjs')

const listClientes = async (req,res) => {
    var clientes = db.clientes
    res.json(clientes)
}
const getClientes = async (req, res) => {
    const _id = req.params.id
    const lista_clientes = db.clientes
    const cliente = lista_clientes.find(
        (cliente) => cliente.id == _id
        )
    cliente ? res.send(cliente) : res.status(404).send({error:'not found'})
}
const createClientes = async (req,res) => {
    const dados = req.body
    if(!dados.nome || !dados.email) {
     res.status(406).send({error:'Nome deve ser informado'})
    }
    const _id = uuidv4()
    const senhaCriptografada = await bcryptjs.hashSync(dados.senha, 10)
    dados.senha = senhaCriptografada
    dados.id = _id
    db.clientes.push(dados)
    fs.writeFile('./db.json', JSON.stringify(db), (err) => {
        if (err){
            res.status(500).send({error:'erro no servidor'})
        }
    })
    res.status(204).send()
}
const updateClientes = async (req,res) => {
    const _id = req.params.id
    const dados = req.body
    const lista_clientes = db.clientes
    const cliente = lista_clientes.find(
        (cliente) => cliente.id == _id
        )
    if (!cliente || !dados) {
        return res.status(404).send({error:'not found'})
    }
    console.log(dados)
    for(const dado in dados){
        if(!dado in cliente){
            console.log('erro: este dado não existe')
            continue
        }
        cliente[dado]=dados[dado];
    }
    fs.writeFile('./db.json', JSON.stringify(db), (err) => {
        if (err){
            return res.status(500).send({error:'erro no servidor'})
        }
    })
    res.status(200).send({cliente})
}
const deleteClientes = async (req,res) => {
    const _id = req.params.id
    const lista_clientes = db.clientes
    const cliente = lista_clientes.find(
        (cliente) => cliente.id == _id
        )
        var idx = lista_clientes.indexOf(cliente)
        lista_clientes.splice(idx,1)
        fs.writeFile('./db.json', JSON.stringify(db), (err) => {
            if (err){
                return res.status(500).send({error:'erro no servidor'})
            }
        })
        res.status(204).send()
        
}

module.exports = {listClientes, getClientes, createClientes, updateClientes, deleteClientes}