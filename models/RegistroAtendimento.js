const mongoose = require('mongoose');
const { isValid, parseISO } = require('date-fns');

const RegistroAtendimentoSchema = new mongoose.Schema({
    nomeCliente: { type: String, required: true },
    procedimento: { type: String, required: true },
    dataHoraAgendada: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return isValid(new Date(value));
            },
            message: props => `${props.value} não é uma data válida!`
        }
    },
    dataHoraRegistro: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return isValid(new Date(value));
            },
            message: props => `${props.value} não é uma data válida!`
        }
    },
    formaPagamento: { type: String, required: true },
    pagamento: { type: Number, required: true }
});

module.exports = mongoose.model('RegistroAtendimento', RegistroAtendimentoSchema);
