import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

//引入context文件
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

//引入注销函数
import { signOutUser } from "../../utils/firebase/firebase.utils";

//调用svg图片时用这种方法。
import { ReactComponent as CrownLogo } from "../../assets/crown.svg";

//引入styled-components类型的css设计
import {
  NavLink,
  NavLinks,
  NavigationContainer,
  LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  return (
    //使用Fragment，方便设置导航
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrownLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {
            //注意：写jsx风格代码前加上{}
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            ) : (
              <NavLink to="/auth">SIGN IN</NavLink>
            )
          }
          <CartIcon />
        </NavLinks>
        {
          //根据context条件判断是否打开Cart
          isCartOpen && <CartDropdown />
        }
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
