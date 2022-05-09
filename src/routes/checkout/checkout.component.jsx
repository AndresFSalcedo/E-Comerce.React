import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';

import CheckoutItem from '../../component/checkout-item/checkout-item.component';

import {CheckoutContainer} from './checkout.styles';

const Checkout = () => {
   const cartItems = useSelector(selectCartItems);
   const cartTotal = useSelector(selectCartTotal);
   
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
