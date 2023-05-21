import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "./button.styles.jsx";

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;

//在React中，组件的子元素可以通过特殊的children属性来获取并渲染。
//即使在组件调用时没有明确设置children属性，React仍然会将组件标签内的内容作为children传递给组件。
//在你提供的代码中，Button组件使用了 解构赋值 来接收属性，其中包括children属性。children属性用于表示组件标签内部的内容。
//当你调用<Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>时，
//"GO TO CHECKOUT"文本被包含在Button组件的标签内部。因此，它被视为Button组件的children属性的值。
