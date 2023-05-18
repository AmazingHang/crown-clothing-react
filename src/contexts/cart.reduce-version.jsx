import { createContext, useEffect, useState } from "react";

//因为有复杂的逻辑，所以不能在数组中简单设置quantity
const addCartItem = (cartItems, productToAdd) => {
  //1.find if cartItems contain productToAdd
  //箭头语法中，{}语句中必须包含return，只有一行时默认return
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === productToAdd.id
  );
  //2.if found,increment quantity
  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //3.return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

//1.初始化一个context
export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

//2.创建Provider并引入index.js中
export const CartProvider = ({ children }) => {
  //setCartOpen在navigation里设置，如果值为True则显示下拉菜单
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    //reduce返回回调函数中积累的结果，第一个参数为回调函数，第二个参数为初始值
    const newCartCount = cartItems.reduce(
      (total, cartItems) => total + cartItems.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = productToAdd => {
    //cartItems是原始的数据，productToAdd是要添加的数据
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  //这些值和回调函数，可以在context里找到
  const value = {
    isCartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };
  //已经在context中初始化值，改value后也会改变context中的值
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
