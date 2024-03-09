import { Router } from "express";
import { check } from "express-validator";

import {
    getCategoriaById,
    createCategoria,
    categoriaDelete,
    getCategory

    
} from "./category.controller.js";



import {
    existenteCategoria,
    NoexistenteCategoria,
    existeCategoriaById
    
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();


router.get(
    "/:id",
    [
        check ("id", "No es un ID valido").isMongoId(),
        check("id").custom(existeCategoriaById),
        validarCampos,
    ],
    getCategoriaById
);


router.post(
    "/",
    [
        //validarJWT,
        check("categoria","El nombre es obligatorio").not().isEmpty(),
        check("categoria").custom(existenteCategoria),
        validarCampos,
    ],
    createCategoria
    );



/*router.put(
    "/:id",
    [
    validarJWT,
    check("categoria","El categoria es obligatorio").not().isEmpty(),
    check("categoria").custom(existeCategoriaById),
    validarCampos,
    ],
    CategoriPut
    );*/


router.delete('/', [validarJWT], categoriaDelete);

    export default router;