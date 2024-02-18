const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombreUsuario:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
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