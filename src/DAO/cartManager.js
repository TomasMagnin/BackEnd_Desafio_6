import fs from "fs";


class cartManager {
    constructor() {
        this.filePath = "/.carts.json";3
        this.carts = [];
        this.loadCarts();
    }

    async createCart() {
        const newCart = {
            id: carts.length>0 ? carts[carts.length-1].id + 1 : 1,
            products: [],
        };
        this.carts.push(newCart);
        await this.saveCarts()
        return newCart;
    }

    async getCart(cartId) {
        const cart = this.carts.find((cart) => cart.id === cartId);
        if(!cart) {
            throw new Error ("Cart not found");
        }else{
            return cart;
        }    
    }

    async loadCarts() {
        try{
            const fileContent = await fs.promises.readFile(this.filePath, 'utf-8');
            const data = JSON.parse(fileContent);
            this.carts = data.carts || [];
        }catch(error){
            console.log("Error loading carts:", error);
        }
    }

    async saveCarts(){
        try{
            await fs.promises.writeFile(this.filePath, JSON.stringify({carts: this.carts}));
        }catch(error){
            console.log("Error saving carts:", error);
        }
    }
};