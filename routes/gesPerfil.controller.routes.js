const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos,existePerfilById  } = require('../middlewares');

const { 
    PerfilPost,
    PerfilGet, 
    PerfilById,
    putPerfil,
    PerfilPostDelete} = require('../controllers/gesPerfil.controller');

const {  } = require('../helpers/db-validators');

const router = Router();

router.get("/", PerfilGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existePerfilById),
        validarCampos
    ], PerfilById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existePerfilById),
        validarCampos
    ], putPerfil);


router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existePerfilById),
        validarCampos
    ], PerfilPostDelete);

module.exports = router;