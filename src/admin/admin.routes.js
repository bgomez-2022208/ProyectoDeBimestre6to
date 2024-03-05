import { Router } from "express";
import { check } from "express-validator";

import {
    createAdmin,
    adminPut,
    getAdminsById
} from "./admin.controller.js";

import {
    existenteEmail,
    existeAdminById,
    esRoleValido
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/:id",
    [
        check ("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeAdminById),
        validarCampos,
    ],
    getAdminsById
);

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 caracteres").isLength({
            min: 6,
          }),
        check("correo", "Este no es un correo válido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],
    createAdmin
    );

    router.put(
        "/:id",
        [
          validarJWT,
          check("nombre", "name cannot be empty").not().isEmpty(),
          check("password", "category cannot be empty").not().isEmpty(),
          validarCampos,
        ],
        adminPut
      );


    export default router;