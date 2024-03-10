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



export const categoriaDelete = async (req, res) => {
    console.log('categoryDelete');
    const { categoria } = req.query;

    try {
        const productos = await Producto.updateMany({ categoria }, { categoria: 'Categorías eliminadas' });

        const result = await Categoria.deleteOne({ categoria });

        res.status(200).json({
            msg: "Categoría eliminada de los productos",
            result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const getCategory = async(req, res) => {
    const {categoria} = req.body;
    const productos = await Producto.find({categoria, status: true});

    res.status(200).json({
        productos
    })
}

export const CategoriPut = async (req, res = response) =>{
    const { id } = req.params;
    const {_id, ...resto} = req.body ;

   

    await Categoria.findByIdAndUpdate(id, resto);

    const  categoria = await Categoria.findOne({_id: id});


    res.status(200).json({
        msg: 'Categoria Actualizado Exitosamente!!!',
        categoria
    });
}