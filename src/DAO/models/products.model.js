import { Schema, model } from "mongoose";
import mongoosePaginate  from "mongoose-paginate-v2";       // Importamos el modulo de paginacion.


const schema = new Schema({
    title: { type: String, required: true, max: 100, unique: true },
    description: { type: String, required: true, max: 100 },
    price: { type: String, required: true, max: 100 },
    thumbnail: { type: String, required: true, max: 100 },
    code: { type: String, required: true, max: 100 },
    stock: { type: String, required: true, max: 100 },
    category: { type: String, required: true, max: 100 },
});
     
schema.plugin(mongoosePaginate);                            // Llamamos el plugin de paginate, para usar la paginacion en el eschema. Este Plugin se lo podemos inyectar a cada schema que queramos.

                                                            // Basicamente le decimos que la tabla de products tiene que tener el esquema anterior creado por el constructor "schema"
export const ProductModel = model("products", schema);          // userModel es ka variable para exportar, "user " seria el nombre de la COLECCTION en la base de datos en Mongo.
