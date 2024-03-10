import {Router} from 'express';
import {check} from 'express-validator';
import {facturaCreate, getFacturaByEmail} from "./factura-controller.js"
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT,validarJWTCustomer } from '../middlewares/validar-jwt.js';
//import {existeEmail} from '../helpers/db-validators.js';

const router = Router();

router.post(
    '/',
    [
        check("fecha","Fecha de la compra").not().isEmpty(),
        check("correo","El correo del cliente").not().isEmpty(),
        check("metodoPago","El metodo con el que va a pagar el cliente").not().isEmpty(),
        validarCampos,
        validarJWTCustomer,
    ],facturaCreate
);

router.get(
    '/',
    [validarJWTCustomer],
    getFacturaByEmail
)

export default router;