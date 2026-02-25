import express from "express";
import { protect } from "../middleware/auth.js";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/wishlistController.js";


const wishlistRoute = express.Router()

wishlistRoute.get('/', protect,getWishlist)
wishlistRoute.post('/', protect, addToWishlist)
wishlistRoute.delete('/:product', protect, removeFromWishlist)

export default wishlistRoute;