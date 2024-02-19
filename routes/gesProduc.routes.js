const { Router } = require('express');
const { check } = require('express-validator');

    
const { validarCampos,existeProducById  } = require('../middlewares');

const { 
    ProducPost,
    ProducGet, 
    ProducById,
    putProduc,
    ProductDelete} = require('../controllers/gesProduc.controller');

const {  } = require('../helpers/db-validators');

const router = Router();

router.get("/", ProducGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProducById),
        validarCampos
    ], ProducById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProducById),
        validarCampos
    ], putProduc);

    router.post(
        "/",
        [
            check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
            check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
            check("correo","Este no es un correo válido").isEmail(),
            check("correo").custom(existenteEmail),
            check("role").custom(esRoleValido),
            validarCampos,
        ], ProducPost);



router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProducById),
        validarCampos
    ], ProductDelete);

module.exports = router;