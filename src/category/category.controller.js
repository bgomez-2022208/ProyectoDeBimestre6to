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
        // Encontrar todos los productos con la categoría a eliminar
        const productos = await Producto.updateMany({ categoria }, { categoria: 'Categorías eliminadas' });

        // Eliminar la categoría
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


export const getCategory = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    try {
        // Obtener las categorías paginadas
        const categorias = await Categoria.find(query)
            .skip(Number(desde))
            .limit(Number(limite));

        // Obtener el total de categorías
        const total = await Categoria.countDocuments(query);

        // Para cada categoría, obtener los productos asociados
        const categoriasConProductos = await Promise.all(categorias.map(async (categoria) => {
            // Buscar el producto asociado a la categoría
            const producto = await Producto.findOne(categoria.keeper);

            // Verificar si se encontró el producto
            if (!producto) {
                return {
                    ...categoria.toObject(),
                    producto: "Producto no encontrado",
                };
            }

            // Devolver la categoría con el producto asociado
            return {
                ...categoria.toObject(),
                producto: producto.nombre,
                // Agrega más campos del producto si lo necesitas
            };
        }));

        // Responder con las categorías y sus productos asociados
        res.status(200).json({
            total,
            categorias: categoriasConProductos,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}
