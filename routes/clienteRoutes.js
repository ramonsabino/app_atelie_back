const express = require('express');
const router = express.Router();
const { getClientes, createCliente } = require('../controllers/clienteController');

router.get('/', getClientes);
router.post('/', createCliente);

module.exports = router;
