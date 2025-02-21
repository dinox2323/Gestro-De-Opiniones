import { body, param } from "express-validator";
import { comentarioExist } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-error.js";
import {validateJWT} from "./validate-jwt.js";

export const agregarComentarioValidator = [
    validateJWT,
    body("descripcion").notEmpty().withMessage("La descripcion es requerido"),
    validarCampos,
    handleErrors
];

export const borrarComentarioValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(comentarioExist),
    validarCampos,
    handleErrors
];

export const actualizaComentarioValidator = [
    validateJWT,
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(comentarioExist),
    body("descripcion").optional().isString().withMessage("La descripcion debe ser una cadena de texto"),
    validarCampos,
    handleErrors
];
