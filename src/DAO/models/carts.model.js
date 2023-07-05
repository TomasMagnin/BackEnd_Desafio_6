import { Schema, model } from "mongoose";

const schema = new Schema({   
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "products",
                    required: true,
                },
                quantity: {type: Number, default: 1},
            },
        ],
        default: [],
    }
});
                                                        // Basicamente le decimos que la tabla de carts tiene que tener el esquema anterior creado por el constructor "schema"
export const CartModel = model("carts", schema);        // userModel es ka variable para exportar, "user " seria el nombre de la COLECCTION en la base de datos en Mongo.
