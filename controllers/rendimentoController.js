const Rendimento = require('../models/Rendimento');

const getRendimentos = async (req, res) => {
    try {
        const rendimentos = await Rendimento.find();
        res.json(rendimentos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createRendimento = async (req, res) => {
    try {
        const novoRendimento = new Rendimento(req.body);
        await novoRendimento.save();
        res.status(201).json(novoRendimento);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getRendimentos, createRendimento };
