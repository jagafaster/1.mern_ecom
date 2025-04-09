import express from "express";
import { placeOrder, placeOrderStripe, placeOrderRazopay, allOrders, userOrders, updateStatus, verifyStripe } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";


const orderRouter = express.Router();

//Admin features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

//Payment features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazopay);

//User features
orderRouter.post('/userorders', authUser, userOrders);

//verify payments
orderRouter.post('/verifyStripe', authUser, verifyStripe);

export default orderRouter;