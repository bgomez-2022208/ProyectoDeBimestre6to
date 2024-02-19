const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos,  } = require('../middlewares');

const { 
    autenticarPost,
    autenticarGet, 
    autenticarById,
    putautenticar,
    autenticarDelete} = require('../controllers/autenticar.controller');

const { existenteEmail, esRoleValido, existeautenticarById } = require('../helpers/db-validators');

const router = Router();

router.get("/", autenticarGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeautenticarById),
        validarCampos
    ], autenticarById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeautenticarById),
        validarCampos
    ], putautenticar);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo","Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        check("role").custom(esRoleValido),
        validarCampos,
    ], autenticarPost);

router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeautenticarById),
        validarCampos
    ], autenticarDelete);

module.exports = router;