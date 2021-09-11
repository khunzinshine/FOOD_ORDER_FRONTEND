import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountRef = useRef();
  const [validAmount, setValidAmount] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const enteredAmount = amountRef.current.value;
    const Amount = +enteredAmount;
    if (enteredAmount.trim().length === 0 || Amount < 1 || Amount > 5) {
      setValidAmount(false);
      return;
    }
    props.onAddItem(Amount);
  };

  const id = Math.random().toString();
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        ref={amountRef}
        label="Item"
        input={{
          id: { id },
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add to Cart</button>
      {!validAmount && <p>Please enter a valid Amount !</p>}
    </form>
  );
};

export default MealItemForm;
