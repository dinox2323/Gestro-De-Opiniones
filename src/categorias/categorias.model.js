import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, "Nombre es requerido"],
        maxLength: [25, "Nombre no puede exceder 25 carácteres"]
    },
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

categoriaSchema.methods.toJSON = function(){
    const { _id, ...categorias} = this.toObject()
    categorias.uid = _id
    return categorias
}

export default model("Categorias", categoriaSchema)