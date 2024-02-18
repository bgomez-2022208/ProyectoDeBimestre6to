const { Router } = require('express');
const { check } = require ('express-validator');

//const { validarCampos } = require('../middlewares/validar-campos');
const { validarCampos, validarJWT, esAdminRole, tieneRolAutorizado } = require('../middlewares');

const {alumnosPost, alumnosDelete, putAlumnos, getAlumById, alumGet} = require('../controllers/alum.controller');
const { existeUsuarioByIdAlumnos,existenteEmailAlumnos, esRoleValido } = require('../helpers/db-validators');

const router = Router();

router.get("/", alumGet);

router.get(
    "/:id",
    [
        check(`id`,"No es un id valido").isMongoId(),
        check(`id`).custom(existeUsuarioByIdAlumnos),
        validarCampos
    ], getAlumById);

router.put(
    "/:id",
    [
        check(`id`,`No es un id valido`).isMongoId(),
        check('id').custom(existeUsuarioByIdAlumnos),
        check("role").custom(esRoleValido),
        validarCampos

    ], putAlumnos);

router.post(
    "/",
    [
        check("nombre", "El nombre no puede estar vacio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({min:6}),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmailAlumnos),
//        check("role").custom(esRoleValido),

        validarCampos,
    ], alumnosPost);

    router.delete(
        "/:id",
        [   
            validarJWT,
            tieneRolAutorizado('ADMIN_ROLE','SUPER_ROLE'),
            check('id', 'No es un id válido').isMongoId(),
            check('id').custom(existeUsuarioByIdAlumnos),
            validarCampos
        ], alumnosDelete);
    


module.exports = router;