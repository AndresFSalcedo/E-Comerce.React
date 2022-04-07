import { createContext, useState, useEffect } from 'react';

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
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   removeItemFromCart: () => {},
   clearItemFromCart: () => {},
   cartCount: 0,
   cartTotal: 0,
});

export const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartcount] = useState(0);
   const [cartTotal, setCartTotal] = useState(0);

   useEffect(() => {
      const newCartCount = cartItems.reduce(
         (total, carItem) => total + carItem.quantity,
         0
      );
      setCartcount(newCartCount);
   }, [cartItems]);

   useEffect(() => {
      const newTotal = cartItems.reduce(
         (total, carItem) => total + carItem.quantity * carItem.price,
         0
      );
      setCartTotal(newTotal);
   }, [cartItems]);

   const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
   };

   const removeItemFromCart = (cartItemToRemove) => {
      setCartItems(removeCartItem(cartItems, cartItemToRemove));
   };

   const clearItemFromCart = (cartItemToClear) => {
      setCartItems(clearCartItem(cartItems, cartItemToClear));
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
