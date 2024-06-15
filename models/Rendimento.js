const mongoose = require('mongoose');
const { isValid, parseISO } = require('date-fns');

const RendimentoSchema = new mongoose.Schema({
    pagamento: { type: Number, required: true },
    data: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return isValid(new Date(value));
            },
            message: props => `${props.value} não é uma data válida!`
        }
    },
    descricao: {type: String, required: false},
    categoria: {type: String, required: false},
    mes: { type: String, required: true },
    tipo: { type: String, enum: ['Entrada', 'Saida'], required: true }
});

RendimentoSchema.pre('save', function(next) {
    if (typeof this.data === 'string') {
        this.data = parseISO(this.data);
    }
    next();
});

module.exports = mongoose.model('Rendimento', RendimentoSchema);
