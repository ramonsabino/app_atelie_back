const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');

const clienteRoutes = require('./routes/clienteRoutes');
const registroAtendimentoRoutes = require('./routes/registroAtendimentoRoutes');
const rendimentoRoutes = require('./routes/rendimentoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
connectDB();

// Usar rotas
app.use('/clientes', clienteRoutes);
app.use('/atendimentos', registroAtendimentoRoutes);
app.use('/rendimentos', rendimentoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
