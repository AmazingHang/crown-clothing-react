import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CardItems,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  //使用navigate组件，使button具有传送功能
  const navigate = useNavigate();

  const goToCheckOutHandler = () => {
    navigate("./checkout");
  };

  //别忘了写return，否则不返回html元素
  return (
    <CartDropdownContainer>
      <CardItems>
        {cartItems.length ? (
          cartItems.map(item => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CardItems>
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
