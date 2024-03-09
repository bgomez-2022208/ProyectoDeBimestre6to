'use strict';

import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Product from './product.js';
import Categoria from '../category/category.js';


export const getProducById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id});

    res.status(200).json({
        product,
    });
}

//Crear

export const createProduct = async (req, res) => {
    const { nombre, precio, cantidad, vendidos, empresa, descripcion, categoria} = req.body;
    const product = new Product ({ nombre, precio, cantidad, vendidos, empresa, descripcion, categoria });

    await product.save();

    res.status(200).json({
        product,
    });
}


export const ProductPut = async (req, res) => {
    const aproductId = req.params.id;
    const {nombre,precio,cantidad,vendidos,empresa,descripcion,categoria} = req.body;
    try {
        const product = await Product.findById(aproductId);

        if (!product){
            return res.status(404).json({ msg: "admin not found"});
        }
        product.nombre = nombre;
        product.precio = precio;
        product.cantidad = cantidad;
        product.vendidos = vendidos;
        product.empresa = empresa;
        product.descripcion = descripcion;
        product.categoria = categoria;

        await product.save();
        res.status(200).json({ msg: "Product updated successfully", product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  export const Productdelete = async (req, res) => {
    const { id } = req.params;

    await Product.findByIdAndUpdate(id, { estado: false });
    res.status(200).json({ msg: 'Producto eliminado exitosamente' });
}




export const getCategory = async(req, res = response) =>{
    const { categoria } = req.query;
    const c = await Categoria.findOne({categoria})
    const p = await Product.find({categoria})

    if(!c){
        return res.status(400).json({
            msg: "Esta categoria no existe"
        });
    }

    res.status(200).json({
        p
    });
}