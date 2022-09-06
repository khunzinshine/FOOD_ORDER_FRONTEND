import React, { Fragment } from "react";
import Meal from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>90's House</h1>
        <HeaderCartButton onClick={props.showModal} />
      </header>
      <div className={classes["main-image"]}>
        <img src={Meal} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
