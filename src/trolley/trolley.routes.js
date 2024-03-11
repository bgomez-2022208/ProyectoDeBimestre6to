import { Router } from "express";
import { check } from "express-validator";

import {
    comprasPut,
    PDFDeFactura
} from "./trolley.controller.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();


router.put(
    '/Compra',
    [
        check('nombre','el producto que va a comprar').not().isEmpty(),
        check('cantidad','la cantidad de unidades que desa del producto').not().isEmpty(),
        validarCampos,
        validarJWT,
    ],comprasPut
)

router.get('/creacion/pdFactura',  PDFDeFactura);

export default router;