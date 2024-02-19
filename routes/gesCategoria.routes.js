const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos,existeCategoriaById  } = require('../middlewares');

const { 
    categoriaPost,
    categoriaGet, 
    categoriaById,
    putcategoria,
    categoriaDelete} = require('../controllers/categoria.controller');

const {  } = require('../helpers/db-validators');

const router = Router();

router.get("/", categoriaGet);

router.get(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ], categoriaById);

router.put(
    "/:id",
    [
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ], putcategoria);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacío").not().isEmpty(),
        check("descripcion","El password debe ser mayor a 6 caracteres").not().isEmpty(),
        check("categoriaPadre","La categoria padre no debe ir vaia").not().isEmpty(),
        check("asociados","Los asociado no debe ir vacia").not().isEmpty(),

        check("estado","debe colocar el numero de sucursal").not().isEmpty(),
        check("role").custom(esRoleValido),
        validarCampos,
    ], categoriaPost);

router.delete(
    "/:id",
    [   
        tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ], categoriaDelete);

module.exports = router;