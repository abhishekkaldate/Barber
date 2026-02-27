import express from "express";
import { protect } from "../middleware/auth.js";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cartController.js";

const CartRouter = express.Router()

//Get user
CartRouter.get('/', protect, getCart);

//Add item
CartRouter.post('/add', protect, addToCart);

//update user
CartRouter.put('/item/:productId', protect, updateCartItem);

//remove cart
CartRouter.delete('/item/:productId', protect, removeCartItem);

//Clear cart
CartRouter.delete('/clear', protect, clearCart);

export default CartRouter;