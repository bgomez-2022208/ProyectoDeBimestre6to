import { Router } from "express";
import { check } from "express-validator";

import {
    createCustomer,
    CustomerPut,
    getCustomerById,
    deleteCustomer
} from "./customer.controller.js";

import {
    existenteEmail,
    existeCustomerById
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWTCustomer } from "../middlewares/validar-jwt.js";

const router = Router();

router.get(
    "/:id",
    [
        check ("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeCustomerById),
        validarCampos,
    ],
    getCustomerById
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
    createCustomer
    );

    router.put(
        "/:id",
        [
            validarJWTCustomer,
          check("nombre", "name cannot be empty").not().isEmpty(),
          check("password", "category cannot be empty").not().isEmpty(),
          validarCampos,
        ],
        CustomerPut
      );

      router.delete(
        "/:id",
        [
        validarJWTCustomer,
          //tieneRole(""),
          check("id", "No es un ID válido").isMongoId(),
          check("id").custom(existeCustomerById),
          validarCampos,
        ],
        deleteCustomer
      );

    export default router;