import mongoose from "mongoose";

const trolleySchema = mongoose.Schema({
    
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
  detalle: {
    type: [{
      precio: { type: Number, required: true },
      cantidad: { type: Number, required: true },
      producto: { type: String, required: true },
    }],
    _id: false,
    }
});

trolleySchema.methods.toJSON = function(){
    const{ __v, _id, ...trolley} = this.toObject();
    trolley.uid = _id;
    trolley.detalle._id=null;
    return trolley;
};

export default mongoose.model('Trolley', trolleySchema);