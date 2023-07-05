import { Schema, model } from "mongoose";
import mongoosePaginate  from "mongoose-paginate-v2";       // Importamos el modulo de paginacion.


const schema = new Schema({
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 100, unique: true},
    password: {type: String, max: 100},
    isAdmin: {type: Boolean, required: true, default: false},
});

schema.plugin(mongoosePaginate);                          // Llamamos el plugin de paginate, para usar la paginacion en el eschema. Este Plugin se lo podemos inyectar a cada schema que queramos.
                                                          // Basicamente le decimos que la tabla de products tiene que tener el esquema anterior creado por el constructor "schema"
export const UserModel = model("users", schema);          // userModel es ka variable para exportar, "user " seria el nombre de la COLECCTION en la base de datos en Mongo.
