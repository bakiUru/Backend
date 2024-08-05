import { Schema, model } from "mongoose";
import mogoosePaginate  from "mongoose-paginate-v2";
import cartModel from "./cart.models.js";
const SALT_WORK_FACTOR = 10;

const userCollection = 'user'

const UserSchema = new Schema ({
    first_name: {
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{ 
        type: String, 
        minlength: 6,
        maxlength: 1024, 
        required:true },
    age:Number,
    password: {
        //hash con bcrypt
        type:String,
        require: true
    },
    cart:{
        type:{
            type: Schema.Types.ObjectId,
            ref: cartModel.modelName
        },
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user' 
    }
},
{timestamps: true})

/*
ESTABA CON MUCHOS PROBLEMAS A LA HORA DE COMPARAR EL PASSWORD-DB CON EL PASSWORD PASADO PARA EL LOGIN
DECIDI BUSCAR EN MONGODB COMO ENCRIPTAR DE FORMA CORRECTA PARA EVITAR PROBLEMAS DE ENCRIPTACION POR LOS SALTOS GENERADOS
FUE LA UNICA FORMA QUE ENCONTRE DE PODER SOLUCIONARLO, EL CODIGO ES COPIADO DE LA PAGINA

*/
UserSchema.pre('create', (next) =>{
    var user = this;
// solo se hashara si es modificado o nuevo
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) =>{
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


});

UserSchema.plugin(mogoosePaginate)
//para que muestre los detalles
/*
UserSchema.pre('findOne',()=>{
    this.populate('cart')
})*/
const userModel = model(userCollection,UserSchema)
export default userModel