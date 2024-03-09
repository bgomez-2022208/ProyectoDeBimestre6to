import { Schema, model } from "mongoose";

const productoSchema = Schema({
    nombre:{
        type: String,
        required: [true, "Nombre del producto es requerido"],
        unique: true,
    },
    precio:{
        type: Number,
        required: [true, "Precio del producto es requerido"],
    },
    cantidad:{
        type: Number,
        required: [true, "Cantidad de existencias es requerida"],
    },
    vendidos:{
        type: Number,
        default: 0,
    },
    empresa:{
        type: String,
        required: [true, "Marca del producto es requerida"],
    },
    descripcion:{
        type: String,
        required: [true, "Descripción del producto es requerida"],
    },
    categoria:{
        type: String,
        required: [true, "Categoría del producto es requerida"],
    },
    estado:{
        type: Boolean,
        default: true,
    }
});

productoSchema.methods.toJSON = function(){
    const{ __v, _id, ...producto} = this.toObject();
    producto.uid = _id;
    return producto;
};

export default model('Producto', productoSchema);