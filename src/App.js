import React, { useState } from "react";
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [modal, setModal] = useState(false);

  const handleShowModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <CartProvider>
      {modal && <Cart closeModal={handleCloseModal} />}
      <Header showModal={handleShowModal} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
