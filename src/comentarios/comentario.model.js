import { Schema, model } from "mongoose";

const comentarioSchema = Schema({
    descripcion:{
        type: String,
        required: [true, "descripción es requerida"],
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

comentarioSchema.methods.toJSON = function(){
    const { _id, ...comentario} = this.toObject()
    comentario.uid = _id
    return comentario
}

export default model("Comentario", comentarioSchema)