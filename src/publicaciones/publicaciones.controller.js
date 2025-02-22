import Publicaciones from "../publicaciones/publicaciones.model.js";
import mongoose from "mongoose";
import User from "../user/user.model.js"

export const agregarPublicacion = async (req, res) => {
    try {
        const data = req.body;
        const {autor} = req.body

        const publicacion = await Publicaciones.create(data);

        await User.findByIdAndUpdate(autor , { $push: { publicaciones: publicacion._id } });


        return res.status(201).json({
            message: "Publicacion creada con éxito",
            publicacion
        });
    } catch (err) {
        return res.status(500).json({
            message: "Fallo al crear el comentario",
            error: err.message
        });
    }
}


export const eliminarPublicaciones = async (req, res) => {
    try {
        const {  uid } = req.params;
        const { userId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario o publicación inválido"
            });
        }

        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (!usuario.publicaciones.includes(uid)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para eliminar esta publicación"
            });
        }

        const publicacion = await Publicaciones.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (!publicacion) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Publicación eliminada",
            publicacion
        });
    } catch (err) {
        console.error("Error al eliminar la publicación:", err);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        });
    }
};


export const actualizarPublicaciones = async (req, res) => {
    try {
        const {  uid } = req.params;
        const { userId } = req.body;
        const data = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(uid)) {
            return res.status(400).json({
                success: false,
                message: "ID de usuario o publicación inválido"
            });
        }

        const usuario = await User.findById(userId);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if (!usuario.publicaciones.includes(uid)) {
            return res.status(403).json({
                success: false,
                message: "No tienes permiso para actualizar esta publicación"
            });
        }

        const publicacionActualizada = await Publicaciones.findByIdAndUpdate(uid, data, { new: true });

        if (!publicacionActualizada) {
            return res.status(404).json({
                success: false,
                message: "Publicación no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Publicación actualizada exitosamente",
            publicacionActualizada
        });
    } catch (err) {
        console.error("Error al actualizar la publicación:", err);
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la publicación",
            error: err.message
        });
    }
};
