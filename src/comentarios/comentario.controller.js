import Comentario from "./comentario.model.js"
import User from "../user/user.model.js"
import Publicaciones from "../publicaciones/publicaciones.model.js"
import mongoose from "mongoose"

export const agregarComentario = async (req, res) => {
    try {
        const data = req.body;
        const {autor} = req.body
        const {publicacion} = req.body

        const comentario = await Comentario.create(data);
        await User.findByIdAndUpdate(autor , { $push: { comentarios: comentario._id } });
        await Publicaciones.findByIdAndUpdate(publicacion , { $push: { comentario: comentario._id } });

        return res.status(201).json({
            message: "Comentario creado con éxito",
            comentario
        });
    } catch (err) {
        return res.status(500).json({
            message: "Fallo al crear el comentario",
            error: err.message
        });
    }
}


export const eliminarComentario = async (req, res) => {
    try {
        const { uid } = req.params;
        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario o comentario inválido"
            });
        }

        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (!usuario.comentarios.includes(uid)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar este comentario"
            });
        }

        const comentarioEliminado = await Comentario.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (!comentarioEliminado) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado correctamente",
            comentarioEliminado
        });
    } catch (err) {
        console.error("Error al eliminar el comentario:", err);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: err.message
        });
    }
};

export const actualizarComentario = async (req, res) => {
    try {
        const { uid } = req.params;
        const { userId } = req.body;
        const data = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario o comentario inválido"
            });
        }

        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (!usuario.comentarios.includes(uid)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para actualizar este comentario"
            });
        }

        const comentarioActualizado = await Comentario.findByIdAndUpdate(uid, data, { new: true });

        if (!comentarioActualizado) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comentario actualizado exitosamente",
            comentarioActualizado
        });
    } catch (err) {
        console.error("Error al actualizar el comentario:", err);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: err.message
        });
    }
};
