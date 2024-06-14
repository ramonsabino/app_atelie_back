const Cliente = require('../models/Cliente');

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createCliente = async (req, res) => {
    try {
        const novoCliente = new Cliente(req.body);
        await novoCliente.save();
        res.status(201).json(novoCliente);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getClientes, createCliente };
