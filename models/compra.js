const { Schema, model} = require('mongoose');

const CompraSchema = Schema({
    productos:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    precio:{
        type: String,
        required: [true, 'El precio es obligatorio'],
        unique: true
    },
    cliente:{
        type: String,
        required: [true, 'Se tiene que saber quien lo compro']
    },
    direccion:{
        type: String,
        required: [true, 'Se tiene que saber donde se compro']
    },
    sucursal:{
        type: String,
        required: [true, 'Numero de sucursal']
        
    },
    estado:{
        type: Boolean,
        default: true
    },
});



module.exports = model('Compra', CompraSchema);