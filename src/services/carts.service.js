import { CartModel } from "../DAO/models/carts.model.js";
import { ProductModel } from "../DAO/models/products.model.js";



export class CartService {
  async createOne() {
    const cartCreated = await CartModel.create({});
    return cartCreated;
  }

  async get(cartId) {
    const cart = await CartModel.findById(cartId).populate("products.product");

    if (!cart) {
      throw new Error("Cart not found");
    }
    return cart;
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      const product = await ProductModel.findById(productId);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!product) {
        throw new Error("Product not found");
      }
      cart.products.push({ product: product._id, quantity: 1 });
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  }

  async updateCart(cartId, products) {
    try {
      const cart = await CartModel.findByIdAndUpdate(
        cartId,
        { products },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error("Error updating cart in database");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      //   console.log(cartId, productId, quantity);

      const cart = await CartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error updating product quantity in cart");
    }
  }

  async removeProduct(cartId, productId) {
    try {
      const cart = await CartModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products.splice(productIndex, 1);
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error removing product from cart");
    }
  }

  async clearCart(cartId) {
    try {
      const cart = await CartModel.findById(cartId);
      cart.products = [];
      await cart.save();
    } catch (error) {
      throw new Error("Error clearing cart");
    }
  }
}

