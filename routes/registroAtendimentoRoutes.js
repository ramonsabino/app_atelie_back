const express = require('express');
const router = express.Router();
const { getAtendimentos, createAtendimento } = require('../controllers/registroAtendimentoController');

router.get('/', getAtendimentos);
router.post('/', createAtendimento);

module.exports = router;
