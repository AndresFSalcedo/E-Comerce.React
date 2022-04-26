import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

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
   if(exitingCartItem.quantity === 1){
      return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
   }
   //return back cartItems with matching cart item q\with reduced quantity
   return cartItems.map((item) =>
      item.id === cartItemToRemove.id
         ? { ...item, quantity: item.quantity - 1 }
         : item
   );
};

const clearCartItem = ( cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)


export const CartContext = createContext({
   isCartOpen: true,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   removeItemFromCart: () => {},
   clearItemFromCart: () => {},
   cartCount: 0,
   cartTotal: 0,
});

const INITIAL_STATE = {
   isCartOpen: false,
   cartItems: [],
   cartCount: 0,
   cartTotal: 0,
}

const CART_ACTIONS_TYPES = {
   SET_CART_ITEMS: 'SET_CART_ITEMS',
   SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = ( state, action ) => {
   const { type, payload } = action;

   switch(type) {
      case CART_ACTIONS_TYPES.SET_CART_ITEMS:
         return {
            ...state,
            ...payload
         }
      
         case CART_ACTIONS_TYPES.SET_IS_CART_OPEN:
            return {
               ...state,
               isCartOpen: payload
            }

      default:
         throw new Error(`Unhandled type of ${type} in cartReducer`)
   }
}

export const CartProvider = ({ children }) => {
   const [ {isCartOpen, cartItems, cartCount, cartTotal}, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

   const updateCartItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce(
         (total, carItem) => total + carItem.quantity,
         0
      );

      const newCartTotal = newCartItems.reduce(
         (total, carItem) => total + carItem.quantity * carItem.price,
         0
      );

      dispatch( createAction (CART_ACTIONS_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal}));
   }

   const addItemToCart = (productToAdd) => {
      const newCartItems = addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(newCartItems);
   };

   const removeItemFromCart = (cartItemToRemove) => {
      const newCartItems = removeCartItem(cartItems, cartItemToRemove);
      updateCartItemsReducer(newCartItems);
   };

   const clearItemFromCart = (cartItemToClear) => {
      const newCartItems = clearCartItem(cartItems, cartItemToClear);
      updateCartItemsReducer(newCartItems);
   }

   const setIsCartOpen = (boolean) => {
      dispatch( createAction(CART_ACTIONS_TYPES.SET_IS_CART_OPEN, boolean));
   }

   const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      cartItems,
      cartCount,
      cartTotal,
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
