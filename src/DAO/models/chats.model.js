import { Schema, model } from "mongoose";

const schema = new Schema({                             // Declaramos la variable auxiliar schema, y pasamos todos este objeto enorme al constructor.
  user: { type: String, required: true, max: 100 },     //No mas de 100 caracteres por seguridad.
  message: { type: String, required: true, max: 100},  // Unique es para no repetir otro mail insgresado, son propiedades de Mongoose
});
                                                            // Basicamente le decimos que la tabla de message tiene que tener el esquema anterior creado por el constructor "schema"
export const ChatModel = model("messages", schema);          // userModel es ka variable para exportar, "user " seria el nombre de la COLECCTION en la base de datos en Mongo.
