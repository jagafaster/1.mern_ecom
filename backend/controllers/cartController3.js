import userModel from "../models/userModel.js";

// Add products to user cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        console.log('add to cart', userId, itemId, size);

        const userData = await userModel.findById(userId);
        let cart = userData.cart || {};

        if (cart[itemId]) {
            if (cart[itemId][size]) {
                cart[itemId][size] += 1;
            } else {
                cart[itemId][size] = 1;
            }
        } else {
            cart[itemId] = {};
            cart[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, { cart });

        res.json({ success: true, message: "Product added to cart successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Update products in user cart
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cart = userData.cart || {};

        if (!cart[itemId]) cart[itemId] = {};
        cart[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cart });

        res.json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Get user cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        let cart = userData.cart || {};

        res.json({ success: true, cart });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { addToCart, updateCart, getUserCart };
