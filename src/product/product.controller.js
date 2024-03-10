'use strict';

import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Product from './product.js';
import Categoria from '../category/category.js';


export const getProducById = async (req, res) => {
    const { nombre } = req.query;
    const product = await Product.findOne({nombre});
    if(!product){
        return res.status(400).json({
            msg: "El producto con este nombre no existe"
        });
    }

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
    const { id } = req.params;
    const {_id, ...resto } = req.body;
 
    await Product.findByIdAndUpdate(id, resto);

    const productos = await Product.findOne({_id: id});


    res.status(200).json({
        msg: 'Usuario Actualizado Exitosamente!!!',
        productos
    });
}

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

 export const ListProduct = async (req, res = response) => {
    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, productos] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        productos
    });
}


export const getAgotados = async (req, res) => {
    const productos = await Product.find({ cantidad: 0, estado: true });
    if (productos.length == 0) {
        return res.status(404).json({
            msg: "No hay productos agotados"
        });
    }

    res.status(200).json({
        msg: "Productos agotados",
        productos
    });
};

