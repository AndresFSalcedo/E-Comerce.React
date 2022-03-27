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

export const CartContext = createContext({
   isCartOpen: false,
   setIsCartOpen: () => {},
   cartItems: [],
   addItemToCart: () => {},
   cartCount: 0,
});

export const CartProvider = ({ children }) => {
   const [isCartOpen, setIsCartOpen] = useState(false);
   const [cartItems, setCartItems] = useState([]);
   const [cartCount, setCartcount] = useState(0);

   useEffect(() => {
      const newCartCount = cartItems.reduce(
         (total, carItem) => total + carItem.quantity,
         0
      );
      setCartcount(newCartCount);
   }, [cartItems]);

   const addItemToCart = (productToAdd) => {
      setCartItems(addCartItem(cartItems, productToAdd));
   };

   const value = {
      isCartOpen,
      setIsCartOpen,
      addItemToCart,
      cartItems,
      cartCount,
   };

   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
