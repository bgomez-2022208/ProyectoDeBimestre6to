import { Router } from "express";
import { check } from "express-validator";

import {
    getProducById,
    createProduct,
    ProductPut,
    Productdelete,
    getCategory,
    ListProduct,
    getAgotados
} from "./product.controller.js";



import {
    existenteProduct,
    existeProducById,
    NoexistenteCategoria
    
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";


const router = Router();

router.get('/', getCategory);

router.get('/agotados', getAgotados);

router.get(
    "/nombre",
    [
        
    ],
    getProducById
);

router.get("/list",[validarJWT,], ListProduct);


router.post(
    "/",
    [
        validarJWT,
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("nombre").custom(existenteProduct),
        check("precio","El precio es obligatorio").isDecimal(),
        check("cantidad","La cantidad es obligatorio").not().isEmpty(),
        check("vendidos","La vendidos es obligatorio").not().isEmpty(),
        check("empresa","La empresa es obligatoria").not().isEmpty(),
        check("descripcion","La descripcion es obligatoria").not().isEmpty(),
        check("categoria","La categoria es obligatoria").not().isEmpty(),
        check("categoria").custom(NoexistenteCategoria),
        validarCampos,
    ],
    createProduct
    );

router.put(
    "/:id",
    [
        validarJWT,
        check(`id`,`No es un id valido`).isMongoId(),
        //check("id").custom(existeProducById),
       
        validarCampos,
    ],
    ProductPut
    );

router.delete('/:id', [validarJWT, validarCampos], Productdelete);




    export default router;