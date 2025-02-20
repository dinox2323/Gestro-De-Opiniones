import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-error.js";

export const registerValidator = [
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({ min: 4 }).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
];

export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
];

export const updateProfilePictureValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
];

export const editProfileValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    body("name").optional().isString().withMessage("El nombre debe ser una cadena de texto"),
    body("username").optional().isString().withMessage("El nombre de usuario debe ser una cadena de texto"),
    body("currentPassword").optional().isLength({ min: 4 }).withMessage("La contraseña actual debe contener al menos 4 caracteres"),
    body("newPassword").optional().isLength({ min: 4 }).withMessage("La nueva contraseña debe contener al menos 4 caracteres"),
    validarCampos,
    handleErrors
];
