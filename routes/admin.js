var express = require('express');
var router = express.Router();
const adminController = require('../controllers/admin');
const { requireAdmin } = require('../public/scripts/admin');

router.get('/notadmin', adminController.notadmin_get);

router.get('/novoServico', requireAdmin, adminController.novoServico_get);
router.post('/novoServico', requireAdmin, adminController.novoServico_post);

router.get('/novoTipo', requireAdmin, adminController.novoTipo_get);
router.post('/novoTipo', requireAdmin, adminController.novoTipo_post);

router.get('/servico/edit/:id', requireAdmin, adminController.notadmin_get);//
router.put('/servico/edit/:id', requireAdmin, adminController.notadmin_get);//

router.post('/servico/delete/:id', requireAdmin, adminController.removerServico_post);

module.exports = router;