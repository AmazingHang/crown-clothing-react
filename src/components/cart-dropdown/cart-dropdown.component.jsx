//使用CartContext
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../contexts/cart.context";

import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckOutHandler = () => {
    navigate("./checkout");
  };
  //别忘了写return，否则不返回html元素
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      {
        //如果直接在onClick中执行函数调用而不是传递回调函数，会导致在渲染期间执行该函数而不是在点击事件发生时执行。
        //这通常不是我们想要的行为，因此应该确保将一个回调函数传递给onClick属性。
      }
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
