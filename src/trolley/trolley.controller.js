'use strict';

import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Product from '../product/product.js';
import Factura from '../factura/factura.js';
import PDFDocument from 'pdfkit'
import fs from 'fs';

export const comprasPut = async (req, res = response) =>{
    const{ correo } = req.query;
    const {nombre,cantidad} = req.body;
    const factura = await Factura.findOne({correo, estado:'En proceso'});
    const producto = await Product.findOne({nombre, estado: true});

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

    
 
    const nuevoDetalle = { precio: producto.precio, cantidad: cantidad, producto: nombre };

    factura.detalle.push(nuevoDetalle);

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

export const PDFDeFactura = async (req, res) => {
    const { correo } = req.body;
    try {
        const factura = await Factura.findOne({ correo: correo, estado: 'En proceso'});

        if (!factura) {
            return res.status(404).json({ msg: 'Hubo un problema para encontrar la factura' });
        }

        const doc = new PDFDocument();
        const directorio = process.env.ARCHIVOS_DIR;

        if (!directorio) {
            throw new Error('La variable de entorno ARCHIVOS_DIR no está definida');
        }

        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, { recursive: true });
        }

        res.setHeader('Content-Disposition', 'attachment; filename="registro.pdf"');
        const writeStream = fs.createWriteStream(directorio+`/registro.pdf`);
        doc.pipe(writeStream);

        doc.text(`Fecha: ${factura.fecha}`);
        doc.text(`Correo: ${factura.correo}`);
        doc.text(`Productos: ${factura.productos}`);
        doc.text(`Unidades: ${factura.cantidad}`);
        doc.text(`Precio: ${factura.precio}`);
        doc.text(`Total: ${factura.total}`);
        
        factura.estado = 'Compra concretada';

        await factura.save();

        doc.end();

        writeStream.on('finish', () => {
            res.status(200).json({ msg: 'El PDF se generó correctamente' });
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ msg: 'Error al generar el PDF' });
    }
};