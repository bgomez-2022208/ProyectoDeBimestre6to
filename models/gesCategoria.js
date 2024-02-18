const { Schema, model} = require('mongoose');

const gesCategoriaSchema = Schema({
    nombreCategoria:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion:{
        type: String,
        required: [true, 'Descripcion de la categoria'],
        unique: true
    },
    categoriaPadre:{
        type: String,
        required: [true, 'cateoria padre']
    },
    asociados:{
        type: String,
        required: [true, 'Se tiene que saber su asociado']
    },
    estado:{
        type: String,
        required: [true, 'Numero de sucursal']
        
    },
   
    
});



module.exports = model('Categoria', gesCategoriaSchema);