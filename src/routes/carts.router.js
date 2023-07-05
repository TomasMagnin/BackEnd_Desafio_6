import express from "express";
import { CartService } from '../services/carts.service.js';
const cartService = new CartService();

export const cartsRouter = express.Router();


cartsRouter.post("/", async (req, res) => {
    try {
      const newCart = await cartService.createOne();
      res.status(201).json(newCart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  cartsRouter.get("/:cid", async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartService.get(cartId); //.populate('products');
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      console.log(cid, pid);
      const cart = await cartService.addProductToCart(cid, pid);
      res.status(200).json(cart);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });
  
  cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const cart = await cartService.removeProduct(cid, pid);
      res
        .status(200)
        .json({ status: "success", message: "Product removed from cart", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  
  cartsRouter.put("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      const { products } = req.body;
      const cart = await cartService.updateCart(cid, products);
      res
        .status(200)
        .json({ status: "success", message: "Cart updated successfully", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  
  cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
      const cart = await cartService.updateProductQuantity(cid, pid, quantity);
      res
        .status(200)
        .json({ status: "success", message: "Product quantity updated", cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  
  cartsRouter.delete("/:cid", async (req, res) => {
    try {
      const { cid } = req.params;
      await cartService.clearCart(cid);
      res
        .status(200)
        .json({ status: "success", message: "Cart cleared successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  });
  