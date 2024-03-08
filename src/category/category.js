import mongoose from 'mongoose';

const CategoriaSchema = mongoose.Schema({
    categoria:{
        type: String,
        required: [true, "The categoria is required"],
        unique: true,
    },
    producto: {
        type: String,
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Categoria', CategoriaSchema);