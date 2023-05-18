import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.style.scss";

const CheckoutItem = ({ cartItem }) => {
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const { name, imageUrl, price, quantity } = cartItem;

  //写Handler的目的是为了
  //1.代码结构清晰。
  //2.方便后续代码优化
  const clearItemHandler = () => {
    clearItemFromCart(cartItem);
  };
  const removeItemHandler = () => {
    removeItemFromCart(cartItem);
  };
  const addItemHandler = () => {
    addItemToCart(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price"> {price} </span>
      <div className="remove-button" onClick={clearItemHandler}>
        {" "}
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
