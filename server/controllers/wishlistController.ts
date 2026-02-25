import { Request, Response } from "express";
import Wishlist from "../models/Wishlist.js";


// GET /api/wishlist
export const getWishlist = async (req: Request, res: Response) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate("products", "name price images stock");

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: []
      });
    }

    res.status(200).json(wishlist);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// POST /api/wishlist
export const addToWishlist = async (req: Request, res: Response) => {
  const { productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [productId]
      });
    } else {
      if (!wishlist.products.includes(productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
      }
    }

    res.status(200).json(wishlist);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE /api/wishlist/:productId
export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== req.params.productId
    );

    await wishlist.save();

    res.status(200).json(wishlist);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};