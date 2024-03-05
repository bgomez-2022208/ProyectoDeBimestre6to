import {response, request } from "express";
import bcryptjs from 'bcryptjs';
import Customer from './customer.js';

export const customerGet = async (req, res = response) => {
    const {limite, desde} = req.body;
    const query = {estado: true};

    const [total, customer] = await Promise.all([
        Customer.countDocuments(query),
        Customer.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        customer
    });
} 

export const createCustomer = async (req, res) => {
    const { nombre, correo, password, preferencias, informacion} = req.body
    const customer = new Customer({ nombre, correo, password, preferencias, informacion, role: "CUSTOMER_ROLE"});
    customer.role = "CUSTOMER_ROLE";

    const salt = bcryptjs.genSaltSync(); 
    customer.password = bcryptjs.hashSync(password, salt);
 
    await customer.save();
 
    res.status(200).json({
        customer,
    });
}


export const CustomerPut = async (req, res) => {
    const customerID = req.params.id;
    const {nombre,password,preferencias,informacion} = req.body;
    try {
        const customer = await Customer.findById(customerID);

        if (!customer){
            return res.status(404).json({ msg: "customer not found"});
        }
        customer.nombre = nombre;
        customer.password = password;
        customer.preferencias = preferencias;
        customer.informacion = informacion;

        await customer.save();
        res.status(200).json({ msg: "customer updated successfully", customer });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findOne({ _id: id});

    res.status(200).json({
        customer,
    });
}


export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    const customer = await Customer.findByIdAndUpdate(id, { estado: false });
    const authenticatedUser = req.customer;

    res.status(200).json({ msg: 'Usuario desactivado', customer, authenticatedUser });
}