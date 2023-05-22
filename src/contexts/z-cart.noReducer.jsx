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
  //3.if not found, return new array with modified cartItems / new cart item
  //对象展开语法 { ...object } 用于创建一个新的对象，该对象继承了 object 的所有属性。
  //在这种情况下，productToAdd 对象的所有属性将被复制到新创建的对象中，然后添加一个新的属性 quantity 并设置其值为 1。
  //必须创建新的对象，否则无法触发渲染
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToRemove.id
  );
  //check if quantity is equal to 1, if it is, remove that item from the list
  if (existingCartItem.quantity === 1)
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);

  //return back cartItems with matching cart item with reduced quantity
  return cartItems.map(cartItem =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
};

//1.初始化一个context
export const CartContext = createContext({
  isCartOpen: false,
  setCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartTotal: 0,
});

//2.创建Provider并引入index.js中
export const CartProvider = ({ children }) => {
  //setCartOpen在navigation里设置，如果值为True则显示下拉菜单
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  //此hook可以计算购物车中的总数，当cartItems变化后，他会更新
  //如果不使用hooks，则状态更新后需要自己配置对应操作
  useEffect(() => {
    //reduce返回回调函数中积累的结果，第一个参数为回调函数，第二个参数为初始值
    const newCartCount = cartItems.reduce(
      (total, cartItems) => total + cartItems.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    //reduce返回回调函数中积累的结果，第一个参数为回调函数，第二个参数为初始值
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  //这些函数都接受一个参数，然后改变本文件内的cartItems的值

  const addItemToCart = productToAdd => {
    //cartItems是原始的数据，productToAdd是要添加的数据
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = cartItemToRemove => {
    //cartItems是原始的数据，productToAdd是要添加的数据
    setCartItems(removeCartItem(cartItems, cartItemToRemove));
  };
  const clearItemFromCart = cartItemToClear => {
    //cartItems是原始的数据，productToAdd是要添加的数据
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  //这些值和回调函数，可以在context里找到
  const value = {
    isCartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,
  };
  //已经在context中初始化值，改value后也会改变context中的值
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
