import { Schema, model } from "mongoose";

const publicacionesSchema = Schema({
    titulo:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    contenido:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    comentario:[{
        type: Schema.Types.ObjectId,
        ref: "Comentarios"
    }],
    categoria:{
        type: Schema.Types.ObjectId,
        ref: "Categoria"
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
})

publicacionesSchema.methods.toJSON = function(){
    const {password, _id, ...publicaciones} = this.toObject()
    publicaciones.uid = _id
    return publicaciones
}

export default model("Publicaciones", publicacionesSchema)