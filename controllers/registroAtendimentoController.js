const RegistroAtendimento = require('../models/RegistroAtendimento');
const Rendimento = require('../models/Rendimento');
const { parseISO, format } = require('date-fns');

const getAtendimentos = async (req, res) => {
    try {
        const atendimentos = await RegistroAtendimento.find();
        res.json(atendimentos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createAtendimento = async (req, res) => {
    try {
        const novoAtendimento = new RegistroAtendimento(req.body);
        await novoAtendimento.save();

        // Criar um novo registro de rendimento
        const dataHora = parseISO(req.body.dataHora);
        const mes = format(dataHora, 'MMMM');
        const novoRendimento = new Rendimento({
            pagamento: req.body.pagamento,
            data: dataHora,
            mes: mes,
            tipo: 'Entrada'
        });
        await novoRendimento.save();

        res.status(201).json(novoAtendimento);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getAtendimentos, createAtendimento };
