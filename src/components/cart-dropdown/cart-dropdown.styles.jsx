import styled from "styled-components";

import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from "../button/button.styles";

//在 JavaScript 的模板字符串中，${} 用于插入变量或表达式的值。
export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  //对引入的元素嵌套，需要先声明要引入的元素
  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    padding: 0;
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;

export const CardItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;
