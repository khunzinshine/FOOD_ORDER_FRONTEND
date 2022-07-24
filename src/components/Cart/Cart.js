import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/CartContext';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
  const [checkout, setCheckout] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const isItem = context.items.length > 0;

  const handleAddItem = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const handleRemoveItem = (id) => {
    context.removeItem(id);
  };

  const handleCheckout = () => {
    setCheckout(true);
  };

  const handleConfirm = (userData) => {
    setIsSubmit(true);
    fetch(
      'https://foodorderapp-12fa3-default-rtdb.asia-southeast1.firebasedatabase.app/order.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderItems: context.items,
        }),
      },
    );
    setIsSubmit(false);
    setDidSubmit(true);
    context.clearItem();
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {context.items.map((cart) => (
        <CartItem
          key={cart.id}
          name={cart.name}
          amount={cart.amount}
          price={cart.price}
          onAdd={handleAddItem.bind(null, cart)}
          onRemove={handleRemoveItem.bind(null, cart.id)}
        />
      ))}
    </ul>
  );

  const cartContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkout && (
        <Checkout onConfirm={handleConfirm} onCancel={props.closeModal} />
      )}
      {!checkout && (
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.closeModal}>
            Close
          </button>
          {isItem && (
            <button className={classes.button} onClick={handleCheckout}>
              Order
            </button>
          )}
        </div>
      )}
    </>
  );

  const isSubmitContent = <p>Sending your orders to kitchen!</p>;
  const didSubmitContent = (
    <div className={classes.actions}>
      <p style={{ textAlign: 'start' }}>Successfully sent your orders!</p>
      <button className={classes.button} onClick={props.closeModal}>
        Close
      </button>
    </div>
  );

  return (
    <Modal>
      {!isSubmit && !didSubmit && cartContent}
      {isSubmit && !didSubmit && isSubmitContent}
      {didSubmit && !isSubmit && didSubmitContent}
    </Modal>
  );
};

export default Cart;
