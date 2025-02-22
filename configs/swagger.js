import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Gestor De Opiniones API",
            version: "1.0.0",
            description: "API para un sistema de gestión de opiniones",
            contact:{
                name: "Joseph Ramirez",
                email: "jramirez-2023013@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3001/gestorOpininiones-2023013/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/categorias/categorias.routes.js",
        "./src/comentarios/comentario.routes.js",
        "./src/publicaciones/publicaciones.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}