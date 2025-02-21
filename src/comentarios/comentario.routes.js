import { Router } from "express";
import { 
    agregarComentario,
    eliminarcomentario,
    actualizarComentario
} from "./comentario.controller.js";
import { 
    agregarComentarioValidator, 
    borrarComentarioValidator,
    actualizaComentarioValidator
} from "../middlewares/comentario-validator.js";

const router = Router();

router.post("/agregarComentario", agregarComentarioValidator, agregarComentario);

router.patch("/borrarComentario/:uid", borrarComentarioValidator, eliminarcomentario);

router.patch("/actualizarComentario/:uid", actualizaComentarioValidator, actualizarComentario);

export default router;
