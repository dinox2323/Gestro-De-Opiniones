import Comentario from "./comentario.model.js"

export const agregarComentario = async (req, res) => {
    try {
        const data = req.body;

        const comentario = await Comentario.create(data);

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


export const eliminarcomentario = async (req, res) => {
    try {
        const { uid } = req.params;

        const comentario = await Comentario.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (!comentario) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comentario eliminado",
            comentario
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
        const data = req.body;

        const comentario = await Comentario.findById(uid);
        if (!comentario) {
            return res.status(404).json({
                success: false,
                msg: 'comentario no encontrado',
            });
        }

        const comentarioActualizado = await Comentario.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Comentario actualizado Exitosamente',
            comentarioActualizado,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar el comentario',
            error: err.message,
        });
    }
};

