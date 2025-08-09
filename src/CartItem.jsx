import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
const calculateTotalAmount = () => {
  let total = 0; // Step 1: Initialize total
  
  // Step 2: Iterate through cart items
  cart.forEach((item) => {
    // Step 3: Extract quantity and cost
    const quantity = item.quantity;
    const costString = item.cost; // e.g., "$15.00"
    
    // Step 4: Convert cost to number and multiply by quantity
    const numericCost = parseFloat(costString.substring(1)); // Removes "$" and converts to number
    total += numericCost * quantity; // Step 5: Add to cumulative total
  });
  
  return total; // Step 6: Return final sum
};

  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default behavior if needed
    if (onContinueShopping) {
      onContinueShopping(); // Call the parent component's function
    }
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
};


  const handleIncrement = (item) => {
    dispatch(updateQuantity({
        name: item.name,
        quantity: item.quantity + 1
      }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({
          name: item.name,
          quantity: item.quantity - 1
        }));
      } else {
        handleRemove(item); // Remove if quantity would become 0
      }
  };

  const handleRemove = (item) => {
    v=  dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
      // 1. Extract the numeric value from the cost string (e.g., "$15.00" → 15.00)
  const numericCost = parseFloat(item.cost.replace('$', ''));
  
  // 2. Calculate total for this item (cost × quantity)
  const itemTotal = numericCost * item.quantity;
  
  // 3. Format to 2 decimal places and return as string
  return itemTotal.toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


