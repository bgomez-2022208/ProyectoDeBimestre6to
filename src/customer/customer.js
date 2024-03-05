import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "The name is required"],
    },
    correo: {
        type: String,
        required: [true, "Email is mandatory"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE","CUSTOMER_ROLE"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
    preferencias: {
        type: String,
        required: [true, "Preferencias is required"],
    },
    informacion: {
        type: String,
        required: [true, "Informacion is required"],
    },
});



export default mongoose.model('Customer', CustomerSchema);