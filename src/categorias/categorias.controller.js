import Categorias from "../categorias/categorias.model.js";

export const agregarCategorias = async (req, res) => {
    try {
        const data = req.body;

        const categorias = await Categorias.create(data);

        return res.status(201).json({
            message: "Categoria creada con exito",
            categorias
        });
    } catch (err) {
        return res.status(500).json({
            message: "Fallo al crear la categoria",
            error: err.message
        });
    }
}

export const listarCategoria = async (req, res) => {
    try {
        const query = { status: true };

        const [total, categorias] = await Promise.all([
            Categorias.countDocuments(query),
            Categorias.find(query)
        ]);

        return res.status(200).json({
            success: true,
            total,
            categorias
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        });
    }
};

export const eliminarCategorias = async (req, res) => {
    try {
        const { uid } = req.params;

        const categorias = await Categorias.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (!categorias) {
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Categoria eliminada",
            categorias
        });
    } catch (err) {
        console.error("Error al eliminar la categoria:", err);
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        });
    }
};

export const actualizarCategorias = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;

        const categorias = await Categorias.findById(uid);
        if (!categorias) {
            return res.status(404).json({
                success: false,
                msg: 'Categorias no encontradas',
            });
        }

        const categoriaActualizada = await Categorias.findByIdAndUpdate(uid, data, { new: true });

        return res.status(200).json({
            success: true,
            msg: 'Categoria actualizada Exitosamente',
            categoriaActualizada,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar la categoria',
            error: err.message,
        });
    }
};

