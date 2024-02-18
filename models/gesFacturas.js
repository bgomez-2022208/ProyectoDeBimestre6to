const { Schema, model} = require('mongoose');

const FacturaSchema = Schema({
    cliente:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    producto:{
        type: String,
        required: [true, 'Descripcion de la categoria'],
        unique: true
    },
    direccion:{
        type: String,
        required: [true, 'cateoria padre']
    },
    
    estado:{
        type: String,
        required: [true, 'Numero de sucursal']
        
    },
   
    
});



module.exports = model('Factura', FacturaSchema);