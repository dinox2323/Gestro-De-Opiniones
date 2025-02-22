import { body, param } from "express-validator";
import { categoriaExist } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-error.js";
import {validateJWT} from "./validate-jwt.js";
import {hasRoles} from "./validate-role.js";

export const agregarCategoriasValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("descripcion").notEmpty().withMessage("La descripcion es requerido"),
    validarCampos,
    handleErrors
];


export const borrarCategoriasValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoriaExist),
    validarCampos,
    handleErrors
];

export const actualizarCategoriaValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(categoriaExist),
    body("nombre").optional().isString().withMessage("El nombre debe ser una cadena de texto"),
    body("descripcion").optional().isString().withMessage("La descripcion debe ser una cadena de texto"),
    validarCampos,
    handleErrors
];
