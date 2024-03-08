'use strict';

import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Categoria from './category.js';
import Producto from '../product/product.js';


export const getCategoriaById = async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOne({ _id: id});

    res.status(200).json({
        categoria,
    });
}


export const createCategoria = async (req, res) => {
    const { categoria} = req.body;
    const categotia = new Categoria ({ categoria});

    await categotia.save();

    res.status(200).json({
        categotia,
    });
}

export const categoriaDelete = async (req,res) => {
    console.log('categoryDelete');
    const {categoria} = req.query;

    const cat = await Categoria.findOne({categoria})
    const p = await Producto.findOne({categoria})

    if(!cat){
        return res.status(400).json({
            msg: "Categoria no existe, vuelva a ingresarla en el query"
        });
    }
    if(!p){
        cat.estado=false;
        const category = await Categoria.findByIdAndUpdate(cat.id, cat);
        return res.status(400).json({
            categoria,
            cat,
            msg: "Categoria no esta registrada en productos, por lo que no se ve afectado"
        });
    }

    cat.estado=false;
    p.categoria='Categorias eliminadas';

    const pcategory = await Producto.findByIdAndUpdate(p.id,p)
    const category = await Categoria.findByIdAndUpdate(cat.id, cat);

    res.status(200).json({
        msg: "Categoria eliminada",
        category,pcategory
    });
}