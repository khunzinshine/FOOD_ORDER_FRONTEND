import React, { useContext } from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/CartContext";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const context = useContext(CartContext);

  const handleAddToCart = (amount) => {
    context.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
    console.log("Added to Cart!", amount);
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddItem={handleAddToCart} />
      </div>
    </li>
  );
};

export default MealItem;
