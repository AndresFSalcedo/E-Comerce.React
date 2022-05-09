import { CART_ACTIONS_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains product to add
    const exitingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );
    // if true, increment quantity
    if (exitingCartItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
    }
    //return new array with modified carItems / new cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    // Find the cartItem to remove
    const exitingCartItem = cartItems.find(
        (item) => item.id === cartItemToRemove.id
    );

    //Check if quantity is equal to 1, if so remove item
    if (exitingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
    //return back cartItems with matching cart item q\with reduced quantity
    return cartItems.map((item) =>
        item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    );
};

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);


export const setIsCartOpen = boolean => createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTIONS_TYPES.SET_CART_ITEMS, newCartItems);
}