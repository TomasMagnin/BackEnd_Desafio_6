import { UserModel } from "../DAO/models/users.model.js";

export class UserService {

     validate(firstName , lastName, email){
        if(!firstName || !lastName || !email) {             // En caso de no exixtir los datos enviamos error.
            console .log("validation error: please complete firstName, lastname and email.");
            throw new Error("validation error: please complete firstName, lastname and email."); 
        }
    }

    async getAll(){
        const users = await UserModel.find({});   // Encontramos y devolverlos todos los usuarios
        return users;
    }


    async createOne(firstName , lastName, email){
        this.validate(firstName , lastName, email)
        const userCreated = await UserModel.create ({ firstName , lastName, email });     // En caso de que los datos ingresados estuvieran correctos, usamos userModdel
        return userCreated;
    }

    async deleteOne(_id){
        const deleted = await UserModel.deleteOne({ _id: _id });       // en la variable deleted, guardamos el metodo de eliminar uno
        return deleted;
    }

    async updateOne(_id, firstName, lastName, email){
        if(!_id) throw new Error("Invalid _id");            // Si no esta el ID tiramos error 
        this.validate(firstName, lastName, email)       // Si faltan algunos de estos datos sale error.
        const userUptaded = await UserModel.updateOne(        // Hacemos un update con el ID que le pasamos
            { _id: id },                                        // Le decimos a que objeto modificar
            { firstName, lastName, email }                      // Que objeto queremos modificar en este caso.
            );
        return userUptaded;
    }
}
