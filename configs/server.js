"use strict";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import authRoutes from "../src/auth/auth.routes.js";
import userRoutes from "../src/user/user.routes.js";
import categoriasRoutes from "../src/categorias/categorias.routes.js"
import comentarioRoutes from "../src/comentarios/comentario.routes.js"
import publicacionesRoutes from "../src/publicaciones/publicaciones.routes.js"
import apLimiter from "../src/middlewares/rate-limit-validator.js";
import {createAdminUser} from "../src/auth/auth.controller.js"
import { swaggerDocs,swaggerUi } from "./swagger.js";


const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apLimiter);
};

const routes = (app) => {
    app.use("/gestorOpininiones-2023013/v1/auth", authRoutes);
    app.use("/gestorOpininiones-2023013/v1/user", userRoutes);
    app.use("/gestorOpininiones-2023013/v1/categorias", categoriasRoutes);
    app.use("/gestorOpininiones-2023013/v1/comentarios", comentarioRoutes);
    app.use("/gestorOpininiones-2023013/v1/publicaciones", publicacionesRoutes);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDB = async () => {
    try {
        await dbConnection();
    } catch (err) {
        console.log(`Database connection failed: ${err}`);
        process.exit(1);
    }
};

export const initServer = () => {
    const app = express();
    try {
        middlewares(app);
        conectarDB();
        routes(app);
        createAdminUser();
        const port = process.env.PORT || 3001; // Asegúrate de que el puerto sea 3001
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};

