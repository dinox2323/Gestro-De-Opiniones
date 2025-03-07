

import express from "express";
import {
    agregarComentario,
    eliminarComentario,
    actualizarComentario
} from "../comentarios/comentario.controller.js";
import { 
    agregarComentarioValidator, 
    borrarComentarioValidator, 
    actualizaComentarioValidator 
} from "../middlewares/comentario-validator.js";

const router = express.Router();

/**
 * @swagger
 * /comentarios/agregarComentario:
 *   post:
 *     summary: Agregar un nuevo comentario
 *     description: Se requiere autenticación con token.
 *     tags: [Comentarios]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               publicacionId:
 *                 type: string
 *                 example: "65df8976b2345a001b0a4567"
 *               contenido:
 *                 type: string
 *                 example: "¡Muy buen artículo!"
 *     responses:
 *       201:
 *         description: Comentario creado con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.post("/agregarComentario", agregarComentarioValidator, agregarComentario);

/**
 * @swagger
 * /comentarios/borrarComentario/{uid}:
 *   patch:
 *     summary: Eliminar un comentario
 *     description: Se requiere autenticación con token.
 *     tags: [Comentarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario eliminado con éxito
 *       404:
 *         description: Comentario no encontrado
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.patch("/borrarComentario/:uid", borrarComentarioValidator, eliminarComentario);

/**
 * @swagger
 * /comentarios/actualizarComentario/{uid}:
 *   patch:
 *     summary: Actualizar un comentario
 *     description: Se requiere autenticación con token.
 *     tags: [Comentarios]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *                 example: "Me ha parecido un excelente artículo."
 *     responses:
 *       200:
 *         description: Comentario actualizado con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Comentario no encontrado
 *       401:
 *         description: No autorizado (token inválido o expirado)
 */
router.patch("/actualizarComentario/:uid", actualizaComentarioValidator, actualizarComentario);

export default router;
