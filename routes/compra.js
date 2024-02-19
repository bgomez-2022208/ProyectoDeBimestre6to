const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos,existeCompraById  } = require('../middlewares');

const { 
    compraPost,
    compraGet, 
    compraById,
    putcompra,
    compraDelete} = require('../controllers/compra.controller');

const {  } = require('../helpers/db-validators');

const router = Router();

router.get("/", compraGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCompraById),
        validarCampos
    ], compraById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCompraById),
        validarCampos
    ], putcompra);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], compraPost);

router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCompraById),
        validarCampos
    ], compraDelete);

module.exports = router;