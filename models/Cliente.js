const mongoose = require('mongoose');
const { isValid, parseISO } = require('date-fns');

const ClienteSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    dataCadastro: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return isValid(new Date(value));
            },
            message: props => `${props.value} não é uma data válida!`
        }
    }
});

ClienteSchema.pre('save', function(next) {
    if (typeof this.dataCadastro === 'string') {
        this.dataCadastro = parseISO(this.dataCadastro);
    }
    next();
});


module.exports = mongoose.model('Cliente', ClienteSchema);
