import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [validInput, setValidInput] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });
  const nameRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enterName = nameRef.current.value;
    const enterStreet = streetRef.current.value;
    const enterPostal = postalRef.current.value;
    const enterCity = cityRef.current.value;

    const validName = !isEmpty(enterName);
    const validStreet = !isEmpty(enterStreet);
    const validCity = !isEmpty(enterCity);
    const validPostal = isFiveChars(enterPostal);

    setValidInput({
      name: validName,
      street: validStreet,
      city: validCity,
      postal: validPostal,
    });

    const validForm = validName && validStreet && validCity && validPostal;
    if (!validForm) {
      return;
    }
    props.onConfirm({
      name: enterName,
      street: enterStreet,
      city: enterCity,
      postal: enterPostal,
    });
  };

  const nameClass = `${classes.control} ${
    validInput.name ? '' : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    validInput.street ? '' : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    validInput.city ? '' : classes.invalid
  }`;
  const postalClass = `${classes.control} ${
    validInput.postal ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!validInput.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!validInput.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef} />
        {!validInput.postal && (
          <p>Please enter a valid postal code (5 characters must long)!</p>
        )}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!validInput.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
