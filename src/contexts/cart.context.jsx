import { createContext, useReducer } from "react";

//增加代码可读性
import { createAction } from "../utils/reducer/reducer.utils";

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

//1.定义并初始化一个context
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

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const INITIAL_STATE = {
  cartCount: 0,
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

//2.创建Provider并引入index.js中
export const CartProvider = ({ children }) => {
  //从state参数解构出要存储的数据
  const [{ cartCount, isCartOpen, cartItems, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = newCartItems => {
    //reduce返回回调函数中积累的结果，第一个参数为回调函数，第二个参数为初始值
    const newCartCount = newCartItems.reduce(
      (total, cartItems) => total + cartItems.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      })
    );
  };

  //这些函数都接受一个参数，然后改变本文件内的cartItems的值
  const addItemToCart = productToAdd => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = cartItemToRemove => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = cartItemToClear => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };
  const setCartOpen = bool => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
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
