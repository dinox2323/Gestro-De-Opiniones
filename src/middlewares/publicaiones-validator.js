import { body, param } from "express-validator";
import { publicacionExist, userExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-error.js";

export const agregarPublicacionValidator = [
    body("titulo").notEmpty().withMessage("El titulo es requerido"),
    body("contenido").notEmpty().withMessage("El contenido es requerido"),
    body("categoria").notEmpty().withMessage("No es un categoria válida"),
    body("categoria").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("autor").notEmpty().withMessage("No es un categoria válida"),
    body("autor").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
];


export const listarPublicacionesValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const eliminarPublicacionValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(publicacionExist),
    validarCampos,
    handleErrors
];

export const actualizarPublicacionValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(publicacionExist),
    validarCampos,
    handleErrors
];
