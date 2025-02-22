import { Router } from "express";
import {
    getUserById,
    getUsers,
    updateProfilePicture,
    editProfile
} from "./user.controller.js"
import {
    getUserByIdValidator,
    updateProfilePictureValidator,
    editProfileValidator
}from "../middlewares/user-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-uploads.js";

const router = Router();

/**
 * @swagger
 * /usuarios/findUser/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Se requiere autenticación con token.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a buscar
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.get("/findUser/:uid", getUserByIdValidator, getUserById);

/**
 * @swagger
 * /usuarios/:
 *   get:
 *     summary: Listar todos los usuarios
 *     description: Se requiere autenticación con token.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.get("/", getUsers);

/**
 * @swagger
 * /usuarios/editProfile/{uid}:
 *   patch:
 *     summary: Editar perfil de usuario
 *     description: Se requiere autenticación con token.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Juan Pérez"
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *     responses:
 *       200:
 *         description: Perfil actualizado con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.patch("/editProfile/:uid", editProfileValidator, editProfile);

/**
 * @swagger
 * /usuarios/updateProfilePicture/{uid}:
 *   patch:
 *     summary: Actualizar la foto de perfil de un usuario
 *     description: Se requiere autenticación con token.
 *     tags: [Usuarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Foto de perfil actualizada con éxito
 *       400:
 *         description: Error en la carga de la imagen
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.patch(
    "/updateProfilePicture/:uid",
    uploadProfilePicture.single("profilePicture"),
    updateProfilePictureValidator,
    updateProfilePicture
);
export default router;
