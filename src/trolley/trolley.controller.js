'use strict';

import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Product from '../product/product.js';
import Factura from '../factura/factura.js';


export const comprasPut = async (req, res = response) =>{
    const{ correo } = req.query;
    const {nombre,cantidad} = req.body;
    const factura = await Factura.findOne({correo, estado:'En proceso'});
    const producto = await Product.findOne({nombre, estado: true}); // Ajustar para usar el modelo de Producto

    if(!factura){
        return res.status(404).json({
            msg: "Correo inválido, no existe en el registro de compras o facturas"
        });
    }

    if(!producto){
        return res.status(404).json({
            msg: 'Producto no registrado'
        });
    }

    if(producto.cantidad < cantidad){
        return res.status(404).json({
            msg: 'Cantidad del producto insuficiente'
        });
    }

    if (isNaN(cantidad) || isNaN(producto.precio)) {
        return res.status(400).json({
            msg: "La cantidad y el precio deben ser valores numéricos"
        });
    }

    if (factura.total === null || typeof factura.total === 'undefined') {
        factura.total = 0;
    }    

    factura.productos.push(nombre);
    factura.cantidad.push(cantidad);
    factura.precio.push(producto.precio);

    console.log(cantidad);
    console.log(producto.precio);
    factura.total += cantidad * producto.precio;
    producto.vendidos = producto.vendidos + cantidad;
    producto.cantidad = producto.cantidad - cantidad;

    await factura.save();
    await producto.save();

    res.status(200).json({
        msg: "Los datos de la factura han sido actualizados",
        factura: factura,
        producto: producto
    });
}