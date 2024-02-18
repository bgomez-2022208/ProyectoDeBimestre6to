const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombreProudcto:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'El escripcion es obligatorio'],
        unique: true
    },
    stock:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    proveedor:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    
    role:{
        type: String,
        require: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },
    estado:{
        type: Boolean,
        default: true
    },
    
});



module.exports = model('Usuario', UsuarioSchema);