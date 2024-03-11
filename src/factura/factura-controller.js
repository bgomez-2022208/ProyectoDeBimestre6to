import bcryptjs from 'bcryptjs';
import Factura from '../factura/factura.js';
import Customer from '../customer/customer.js';
import {response} from 'express';

export const facturaCreate = async (req,res) => {
    const {fecha,correo,metodoPago} = req.body;
    const factura = new Factura({fecha,correo,metodoPago});

    const customer = await Customer.findOne({correo});
    const proceso = await Factura.findOne({correo, estado: 'En proceso'});

    if(!customer){
        return res.status('El usuario no existe').json({
            msg: "Este usuario no ha sido registrado"
        });
    }
    if (proceso) {
        return res.status(400).json({
            msg: "Ya existe una factura en proceso para este correo."
       });
    }

    await factura.save();

    res.status(200).json({
        factura,
        customer
    });
}


export const getFacturaByEmail = async (req,res) =>{
    const {correo} = req.query;
    try {
        const factura = await Factura.findOne({correo:correo});
        if(!factura){
            return res.status(200).json({
                msg: "El usuario con este correo no existe",
            });
        }
        res.status(200).json({
            msg: "Listado de facturas",
            facturas:factura
        });
    } catch (error) {
        console.error('Error al listar las facturas:', error);
    }
}