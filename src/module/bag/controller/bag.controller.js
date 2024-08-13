
import { UserModel } from "../../../../DB/model/user.js";
// Add items to user cart
export const AddToBag = async (req, res) => {
  try {
    console.log('adddToBag')
    const { itemId } = req.body;
    console.log('req.user._id', req.user._id)
    const userData = await UserModel.findOne({ _id: req.user._id });
    if (!userData) {
      return res.json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }

    await UserModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

export const deleteItemFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    let userData = await UserModel.findOne({ _id: req.user._id });

    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      delete cartData[itemId];
    } else {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    await UserModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error removing item from cart' });
  }
};

export const addToCartFromLocalstorage = async (req, res) => {
  try {


    const { cartData } = req.body;
    console.log('ssssssss')
    let userData = await UserModel.findOne({ _id: req.user._id });


    if (!userData) {
      return res.json({ success: false, message: 'يجب تسجيل الدخول' });
    }

    let existingCartData = userData.cartData || {};
    for (let itemId in cartData) {
      existingCartData[itemId] = cartData[itemId];
    }
    console.log(existingCartData)

    await UserModel.findByIdAndUpdate(req.user._id, { cartData: existingCartData });
    res.json({ success: true, message: "Cart updated from local storage" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Remove items from user cart
export const deletFrombag = async (req, res) => {
  try {
    const { itemId } = req.body;
    let userData = await UserModel.findOne({ _id: req.user._id });
    let cartData = userData.cartData || {};
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await UserModel.findByIdAndUpdate(req.user._id, { cartData });
    res.json({ success: true, message: 'Removed success' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// Get user cart data
export const getCart = async (req, res) => {
  try {
    let userData = await UserModel.findOne({ _id: req.user._id });
    let cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
