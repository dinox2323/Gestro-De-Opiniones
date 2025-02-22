
import express from "express";
import {
    agregarCategorias,
    listarCategoria,
    eliminarCategorias,
    actualizarCategorias
} from "../categorias/categorias.controller.js";
import { 
    agregarCategoriasValidator, 
    borrarCategoriasValidator, 
    actualizarCategoriaValidator 
} from "../middlewares/categoria-validator.js";

const router = express.Router();

/**
 * @swagger
 * /categorias/agregarCategorias:
 *   post:
 *     summary: Agregar una nueva categoría
 *     description: Solo los administradores pueden agregar categorías. Se requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Electrónica"
 *               descripcion:
 *                 type: string
 *                 example: "Categoría para productos electrónicos"
 *     responses:
 *       201:
 *         description: Categoría creada con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       401:
 *         description: No autorizado (token inválido o sin permisos)
 */
router.post("/agregarCategorias", agregarCategoriasValidator, agregarCategorias);

/**
 * @swagger
 * /categorias/:
 *   get:
 *     summary: Listar todas las categorías
 *     description: Devuelve todas las categorías registradas. Se requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito
 *       401:
 *         description: No autorizado (token inválido o sin permisos)
 */
router.get("/", listarCategoria);

/**
 * @swagger
 * /categorias/borrarCategoria/{uid}:
 *   patch:
 *     summary: Eliminar una categoría
 *     description: Solo los administradores pueden eliminar categorías. Se requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada con éxito
 *       404:
 *         description: Categoría no encontrada
 *       401:
 *         description: No autorizado (token inválido o sin permisos)
 */
router.patch("/borrarCategoria/:uid", borrarCategoriasValidator, eliminarCategorias);

/**
 * @swagger
 * /categorias/actualizarCategorias/{uid}:
 *   patch:
 *     summary: Actualizar una categoría
 *     description: Solo los administradores pueden actualizar categorías. Se requiere autenticación con token.
 *     tags: [Categorías]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la categoría a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Electrónica"
 *               descripcion:
 *                 type: string
 *                 example: "Categoría para productos electrónicos"
 *     responses:
 *       200:
 *         description: Categoría actualizada con éxito
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Categoría no encontrada
 *       401:
 *         description: No autorizado (token inválido o sin permisos)
 */
router.patch("/actualizarCategorias/:uid", actualizarCategoriaValidator, actualizarCategorias);

export default router;
