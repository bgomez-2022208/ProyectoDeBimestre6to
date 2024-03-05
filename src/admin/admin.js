import mongoose from 'mongoose';

const AdminSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "The name is required"],
    },
    correo: {
        type: String,
        required: [true, "Email is mandatory"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE","CUSTOMER_ROLE"],
    },
    estado: {
        type: Boolean,
        default: true,
    },
});

/*AdminSchema.methods.toJSON = function(){
    const { __v, password, _id, ...admin} = this.toObject(),
    admin.uid = id;
    return admin;
}*/

export default mongoose.model('Admin', AdminSchema);