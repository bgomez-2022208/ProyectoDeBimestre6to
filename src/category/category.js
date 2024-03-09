import mongoose from 'mongoose';

const CategoriaSchema = mongoose.Schema({
    categoria:{
        type: String,
        required: [true, "La categoría es requerida"],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Categoria', CategoriaSchema);