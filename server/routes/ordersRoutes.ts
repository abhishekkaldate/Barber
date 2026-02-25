import express from "express";
import { authorize, protect } from "../middleware/auth.js";
import { createOrder, getAllOrders, getOrder, getOrders, updateOrderStatus } from "../controllers/ordersController.js";

const OrderRouter = express.Router()

//get user
OrderRouter.get('/', protect, getOrders)

//get single user
OrderRouter.get('/:id', protect, getOrder)

//create
OrderRouter.post('/', protect, createOrder)

//update user
OrderRouter.put('/:id/status', protect, authorize("admin"), updateOrderStatus)

//get all
OrderRouter.get('/admin/all', protect, authorize("admin"), getAllOrders)

export default OrderRouter;