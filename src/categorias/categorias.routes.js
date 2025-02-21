import { Router } from "express";
import { 
    agregarCategorias,
    listarCategoria,
    eliminarCategorias,
    actualizarCategorias
} from "./categorias.controller.js";
import { 
    agregarCategoriasValidator, 
    borrarCategoriasValidator,
    actualizarCategoriaValidator
} from "../middlewares/categoria-validator.js";

const router = Router();

router.post("/agregarCategorias", agregarCategoriasValidator, agregarCategorias);

router.get("/", listarCategoria);

router.patch("/borrarCategoria/:uid", borrarCategoriasValidator, eliminarCategorias);

router.patch("/actualizarCategorias/:uid",actualizarCategoriaValidator , actualizarCategorias);

export default router;
