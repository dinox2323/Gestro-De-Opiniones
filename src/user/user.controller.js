import { hash, verify } from "argon2";
import User from "./user.model.js";
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getUserById = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        return res.status(200).json({
            success: true,
            total,
            users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        });
    }
};


export const updateProfilePicture = async (req, res) => {
    try {
        const { uid } = req.params;
        let newProfilePicture = req.file ? req.file.filename : null;

        if (!newProfilePicture) {
            return res.status(400).json({
                success: false,
                msg: 'No se proporcionó una nueva foto de perfil',
            });
        }

        const user = await User.findById(uid);

        if (user.profilePicture) {
            const oldProfilePicturePath = join(__dirname, "../../public/uploads/profile-pictures", user.profilePicture);
            await fs.unlink(oldProfilePicturePath);
        }

        user.profilePicture = newProfilePicture;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Foto de perfil actualizada',
            user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la foto de perfil',
            error: err.message
        });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const { name, username, currentPassword, newPassword } = req.body;

        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado',
            });
        }

        if (currentPassword && newPassword) {
            const isPasswordValid = await verify(user.password, currentPassword);
            if (!isPasswordValid) {
                return res.status(400).json({
                    success: false,
                    msg: 'Contraseña actual incorrecta',
                });
            }
            user.password = await hash(newPassword);
        }

        if (name) user.name = name;
        if (username) user.username = username;

        await user.save();

        return res.status(200).json({
            success: true,
            msg: 'Perfil actualizado exitosamente',
            user,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: 'Error al actualizar el perfil',
            error: err.message,
        });
    }
};
