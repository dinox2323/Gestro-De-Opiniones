import express from "express";
import {
    agregarPublicacion,
    eliminarPublicaciones,
    actualizarPublicaciones
} from "../publicaciones/publicaciones.controller.js";
import { 
    agregarPublicacionValidator, 
    eliminarPublicacionValidator, 
    actualizarPublicacionValidator 
} from "../middlewares/publicaiones-validator.js";

const router = express.Router();

/**
 * @swagger
 * /publicaciones/agregarPublicacion:
 *   post:
 *     summary: Agregar una nueva publicación
 *     description: Se requiere autenticación con token.
 *     tags: [Publicaciones]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Mi primer post"
 *               contenido:
 *                 type: string
 *                 example: "Este es el contenido de la publicación."
 *     responses:
 *       201:
 *         description: Publicación creada con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.post("/agregarPublicacion", agregarPublicacionValidator, agregarPublicacion);

/**
 * @swagger
 * /publicaciones/eliminarPublicaciones/{uid}:
 *   patch:
 *     summary: Eliminar una publicación
 *     description: Se requiere autenticación con token.
 *     tags: [Publicaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación a eliminar
 *     responses:
 *       200:
 *         description: Publicación eliminada con éxito
 *       404:
 *         description: Publicación no encontrada
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.patch("/eliminarPublicaciones/:uid", eliminarPublicacionValidator, eliminarPublicaciones);

/**
 * @swagger
 * /publicaciones/actualizarPublicaciones/{uid}:
 *   patch:
 *     summary: Actualizar una publicación
 *     description: Se requiere autenticación con token.
 *     tags: [Publicaciones]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Nuevo título de la publicación"
 *               contenido:
 *                 type: string
 *                 example: "Actualizando el contenido de mi publicación."
 *     responses:
 *       200:
 *         description: Publicación actualizada con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Publicación no encontrada
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.patch("/actualizarPublicaciones/:uid", actualizarPublicacionValidator, actualizarPublicaciones);

export default router;
