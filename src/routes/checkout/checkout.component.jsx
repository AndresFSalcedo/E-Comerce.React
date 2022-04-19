import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import CheckoutItem from '../../component/checkout-item/checkout-item.component';

import {CheckoutContainer} from './checkout.styles';

const Checkout = () => {
   const { cartItems, cartTotal } = useContext(CartContext);
   return (
      <CheckoutContainer>
         <div className='checkout-header'>
            <div className='header-block'><span>Product</span></div>
            <div className='header-block'><span>Description</span></div>
            <div className='header-block'><span>Quantity</span></div>
            <div className='header-block'><span>Price</span></div>
            <div className='header-block'><span>Remove</span></div>
         </div>

         {cartItems.map((cartItem) => (
               <CheckoutItem key={cartItem.id} cartItem={cartItem} />
         ))}
         <span className='total'>Total: ${cartTotal}</span>
      </CheckoutContainer>
   );
};

export default Checkout;
