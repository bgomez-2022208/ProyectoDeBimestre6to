const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos,existeFacturaById  } = require('../middlewares');

const { 
    facturasPost,
    facturasGet, 
    facturasById,
    putfacturas,
    facturasDelete} = require('../controllers/categoria.controller');

const {  } = require('../helpers/db-validators');

const router = Router();

router.get("/", facturasGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeFacturaById),
        validarCampos
    ], facturasById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeFacturaById),
        validarCampos
    ], putfacturas,
    );

router.post(
    "/",
    [
        check("cliente", "El nombre no puede estar vacío").not().isEmpty(),
        check("producto","El password debe ser mayor a 6 caracteres").not().isEmpty(),
        check("direccion","La categoria padre no debe ir vaia").not().isEmpty(),

        check("estado","debe colocar el numero de sucursal").not().isEmpty(),
        validarCampos,
    ], facturasPost);

router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeFacturaById),
        validarCampos
    ], facturasDelete);

module.exports = router;