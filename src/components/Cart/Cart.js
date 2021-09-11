import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const context = useContext(CartContext);
  const totalAmount = `$${context.totalAmount.toFixed(2)}`;
  const isItem = context.items.length > 0;

  const handleAddItem = (item) => {
    context.addItem({ ...item, amount: 1 });
  };

  const handleRemoveItem = (id) => {
    context.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
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

  return (
    <Modal>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.closeModal}>
          Close
        </button>
        {isItem && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
