import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const context = useContext(CartContext);
  const [btnHightlight, setBtnHightlight] = useState(false);
  const { items } = context;
  const itemsCount = items.reduce((current, item) => {
    return current + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnHightlight ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHightlight(true);
    const timer = setTimeout(() => {
      setBtnHightlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemsCount}</span>
    </button>
  );
};

export default HeaderCartButton;
