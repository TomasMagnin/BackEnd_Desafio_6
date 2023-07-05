import express from "express";                                    // Importamos el modulo de servidor en express.
import { Server } from 'socket.io';
import handlebars from "express-handlebars";
import { __dirname, __filename, connectMongo, connectSocket} from "./utils.js";                           // Importamos la variable __dirname, de la configuracion de MULTER para poder subir archivos, LA variable dirname, es una variable de Node con un path aboluto a la carpeta que le indicamos.
import path from "path";
import { productsRouter } from "./routes/products.router.js";     // Importamos los endpoint Productos.
import { cartsRouter } from "./routes/carts.router.js";           // Importamos los endpoint Carts.
import { viewsRouter } from "./routes/views.router.js";
import { chatRouter } from "./routes/chat.router.js"
import session from "express-session";
import { authRouter } from "./routes/auth.router.js";
import MongoStore from "connect-mongo";
import http from "http";
import passport  from "passport";
import { iniPassport } from "./config/passport.config.js";





const app = express();                                              // Asignamos la funcionaldiad del servidor en la app express.
const port = 8080;   
const httpServer = http.createServer(app);                          // Asignamos el N° de puerto a una varibale. 
const socketServer = new Server(httpServer);                        // Guardamos nuestro servidor socket en una variable


// Middleware 
app.use(express.json());                                        // Declaramos que el servidor utiliza formato JSON por defecto.
app.use(express.urlencoded({extended: true}));                  // Declaramos que extendemos lo que recive por URL, para recivir datos complejos y porder mapearlos desde la URL.
app.use(express.static("./public"));                              // Usamos una carpeta public, para guardar archivos estaticos, donde puede acceder el usuario. El nombre del directorio no forma parte de la URL.
app.use(session({
    store: MongoStore.create({
    mongoUrl: "mongodb+srv://tomasmagnin:wRHD9t0bpXzg74iX@backendcoder.tsh7jee.mongodb.net/ecommerce?retryWrites=true&w=majority", ttl: 3600}),
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
})
);


iniPassport();
app.use(passport.initialize());
app.use(passport.session());


//  Configuracion de Handlebars 
app.engine("handlebars", handlebars.engine());      // Inicializamos el motor de plantilla. El engine de la app es el de handlebars.
app.set("views", path.join(__dirname, "views"));    // Indicamos en que parte del proyecto se encuentran las vistas, usando la variable __dirname para usar rutas absolutas, seleccionado la carpeta(views) o archivo y no pifiarle a la direccion. El ultimo archivo es en que carpeta se encuentran las vistas.
app.set("view engine", "handlebars");               // Indicamos que el motor que ya inicializamos es el que vamos a utilziar por defecto.

// Seteo de Rutas
app.use("/api/products", productsRouter);                       // Le decimos a la app, que use todo lo que esta en la ruta api/products, lo maneja productsRouter.
app.use("/api/carts", cartsRouter);                             // Le decimos a la app, que use todo lo que esta en la ruta api/carts, lo maneja cartsRouter.
app.use("/", viewsRouter);
app.use("/chat", chatRouter);
app.use("/auth", authRouter);
app.use("api/sessions", sessionsRouter);


app.listen(port, ()=> {
    console.log(`App listen on port: ${port}  http://localhost:${port} `);  // Le decimos al servidor en que puerto recivir las peticiones.
});


app.get("*", (req, res) => {                                    // Si no machea con ninguna ruta entra a esta middleware default.
    return res.status(400).json({
        status: "error",                                        // En caso positivo succes.
        msj: "No se encuentra ruta URL",
        data: {},                                               // En caso positivo serian los datos.
    });
});


connectMongo();
connectSocket(httpServer);