import Admin from '../admin/admin.js'
import Customer from '../customer/customer.js'

export const existenteEmail = async (correo = '') => {
    const existeEmail = await Admin.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}

export const existeAdminById = async (id = '') => {
    const existeAdmin = await Admin.findById(id);
    if (!existeAdmin){
        throw new Error(`El ID: ${correo} No existe`);
    }
}

export const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El role ${ role } no existe en la base de datos`);
    }
}

export const existeCustomerById = async (id = '') => {
    const existeCustomer = await Customer.findById(id);
    if (!existeCustomer){
        throw new Error(`El ID: ${correo} No existe`);
    }
}