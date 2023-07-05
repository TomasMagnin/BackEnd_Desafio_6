import fs from "fs";

export class ProductManager{
    path;
    constructor(path){
        this.path = path;   // Creamos un objeto con la ruta que le pasamos.
    }

    async addProduct(newProduct) { 
        let flagValidator;
        try { 
            const {title, description, price, thumbnail, code, stock} = newProduct;  // Desestructuramos las propiedaes del objeto newProduct, para asignarlas a variables separadas que le especificamos y luego asignara los valores correspondientes a las variables del objeto newProduct.
            const products = await this.getProducts();                               // usando el metodo get traemos la informacion de nuestro sistema de archivos.
            if(title && description && price && thumbnail && code && stock && this.validateCode(code)) {        // Verificamos que las varibles contengan sus valores respectivamente.
                flagValidator = true;
                const product = {
                    id: await this.getNewId(),
                    title,
                    description,
                    price,
                    thumbnail,
                    code, 
                    stock,
                }
                products.push(product);
                await this.saveProduct(this.path, products);
                return `Product ID:${product.id} added !`; 
            }else {
                    flagValidator = false;
                    return "Error, Validate fields";
                  }
        } catch (error) {
            console.log(`Error ${error}`);
        } 
         finally{
            return flagValidator;
         }  
    }

    async addCart(newProduct){
        let flagFound;
        try{
            const products = await this.getProducts();
            if(newProduct) {
                flagFound = true;
                id = await this.getNewId();
                products.push({"id":id, ...newProduct});
                await saveProduct(this.path, products);
                console.log(`Product ID:${product.id} added !`);
            } else {
                flagFound = false;
                console.log("Add op fail");
            }
        }
        catch(error) {
            console.log(`Error ${error}`);
        }
        finally {
            return flagFound;
        }
    }

    async getProducts() {
        
        try {
            let product = [];
            if(fs.existsSync(this.path)){
                const dataFile = await fs.promises.readFile(this.path, "utf-8");
                return product = JSON.parse(dataFile);
            }else{
                return product;    
            }
        } catch (error) {
            console.log(`Error ${error}`);
        }
    };

    async saveProduct(path, dataProduct){
        try {
            let productsStrFy = JSON.stringify(dataProduct, null, 2);
            await fs.promises.writeFile(path, productsStrFy);
        }
        catch (error) {
            console.log(`Error ${error}`);
       } 
    };
   
    async getNewId(){
        try {
            let idMax = 0;
            const products = await this.getProducts();
            products.forEach(item => {
                if(item.id > idMax){
                    idMax = item.id;
                }
             });
             return idMax + 1;
        } catch (error) {
            console.log(`Error ${error}`);
        }
    };

    async validateCode(code) {
        try{
            const products = await this.getProducts();
            const result = products.find(item => item.code == code)
           return result ? false : true;    
        }
        catch(error){
            console.log(`Error ${error}`);
        }
    };

    async getProductById(id) { 
        try {
            const products = await this.getProducts();
            const findById =  products.find(item =>item.id == id);
            return findById ? products[id-1] : console.log("Not found");
        } catch (error) {
            console.log(`Error ${error}`);
        }
        
    };

    async updateProduct(id, change){
        let flagFound;
        try {
            const products =await this.getProducts();
            const productIndex = products.findIndex((product) =>  product.id == id);
            if(productIndex == -1){
                return console.log("Not Product");
            }
            flagFound = true;
            const productFind = products[productIndex];
            const productUpdate = {...productFind, ...change};
            products[productIndex] = {...productUpdate, id};
            await this.saveProduct(this.path, products)
        } catch (error) {
            flagFound = false;
            console.log(`Error ${error}`);
        }
        finally{
            return flagFound;
        }   
    };

    async deleteProduct(id){
        let flagFound;
        try {
            const products = await this.getProducts();
            if(products.some(item => item.id == id)){
                flagFound = true;
                const newProducts = products.filter((product) => product.id !== id);
                await this.saveProduct(this.path, newProducts);
            } else {
                return " Producto no Encontrado";
            }
        } catch (error) {   
            flagFound = false;
            console.log(`Error ${error}`);
        }
        finally {
            flagFound;
        }
    }
};



