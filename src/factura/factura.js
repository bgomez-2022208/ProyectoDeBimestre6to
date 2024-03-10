import mongoose from "mongoose";

const trolleySchema = mongoose.Schema({
    productos:{
        type: [String],
    },
    precio:{
        type:[Number],
    },
    cantidad:{
        type:[Number],
    },
    metodoPago:{
        type:String,
        required:['Metodo de pago']
    },
    total:{
        type: Number
    },
    fecha:{
        type:Date,
        required:['Fecha de compra']
    },
    estado:{
        type:String,
        default: "En proceso"
    },
    correo:{
        type:String,
        required:['email del comprador']
    },
});

trolleySchema.methods.toJSON = function(){
    const{ __v, _id, ...trolley} = this.toObject();
    trolley.uid = _id;
    return trolley;
};

export default mongoose.model('Trolley', trolleySchema);