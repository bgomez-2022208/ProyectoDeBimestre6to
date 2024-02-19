const { Router } = require('express');
const { check } = require('express-validator');

    
const { validarCampos,existeProducById  } = require('../middlewares');

const { 
    usuarioPost,
    usuarioGet, 
    usuarioById,
    putusuario,
    usuarioDelete} = require('../controllers/gesUsuario.controller');

const {  } = require('../helpers/db-validators');

const router = Router();

router.get("/", usuarioGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProducById),
        validarCampos
    ], usuarioById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProducById),
        validarCampos
    ], putusuario);

    router.post(
        "/",
        [
            check("nombreUsuario", "El nombre no puede estar vacío").not().isEmpty(),
            check("password","El password debe ser mayor a 6 caracteres").isLength({min:6}),
            check("correo","Este no es un correo válido").isEmail(),
            check("correo").custom(existenteEmail),
            check("role").custom(esRoleValido),
            validarCampos,
        ], usuarioPost);



router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeProducById),
        validarCampos
    ], usuarioDelete);

module.exports = router;