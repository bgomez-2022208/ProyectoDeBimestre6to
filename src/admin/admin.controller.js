'use strict';

import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Admin from './admin.js';


// Metodo para obtener al administrador
export const getAdminsById = async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findOne({ _id: id});

    res.status(200).json({
        admin,
    });
}

//Crear

export const createAdmin = async (req, res) => {
    const { nombre, correo, password} = req.body;
    const admin = new Admin ({ nombre, correo, password, role: "ADMIN_ROLE"});
    admin.password ="ADMIN_ROLE";

    const salt = bcryptjs.genSaltSync();
    admin.password = bcryptjs.hashSync(password, salt);

    await admin.save();

    res.status(200).json({
        admin,
    });
}

//Update

export const adminPut = async (req, res) => {
    const adminId = req.params.id;
    const {nombre,password} = req.body;
    try {
        const admin = await Admin.findById(adminId);

        if (!admin){
            return res.status(404).json({ msg: "admin not found"});
        }
        admin.nombre = nombre;
        admin.password = password;

        await admin.save();
        res.status(200).json({ msg: "admin updated successfully", admin });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
/*
const { id } = req.params;
await Admin.findByIdAndUpdate(id, resto);

    const admin = await Admin.findOne({_id: id});

    res.status(200).json({
        msg: 'Administrador actualizado',
        admin,
    });*/ 