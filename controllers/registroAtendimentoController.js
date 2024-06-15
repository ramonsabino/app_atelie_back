const { parseISO, format, isValid } = require('date-fns');
const RegistroAtendimento = require('../models/RegistroAtendimento');
const Rendimento = require('../models/Rendimento');

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
        // Verifica se req.body.dataHoraRegistro está presente e é uma string válida
        if (!req.body.dataHoraRegistro || typeof req.body.dataHoraRegistro !== 'string') {
            throw new Error('O campo dataHoraRegistro é obrigatório e deve ser uma string válida.');
        }

        // Cria um novo registro de atendimento
        const novoAtendimento = new RegistroAtendimento(req.body);
        await novoAtendimento.save();

        // Cria um novo registro de rendimento
        const dataHoraRegistro = parseISO(req.body.dataHoraRegistro);
        if (!isValid(dataHoraRegistro)) {
            throw new Error(`${req.body.dataHoraRegistro} não é uma data e hora válida.`);
        }
        const mes = format(dataHoraRegistro, 'MMMM');
        const novoRendimento = new Rendimento({
            pagamento: req.body.pagamento,
            data: dataHoraRegistro,
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
