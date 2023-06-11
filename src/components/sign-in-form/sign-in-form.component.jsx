import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};
//在此开始
const SignInForm = () => {
  //存储本地表单变量
  const [formFields, setFormFields] = useState(defaultFormFields);
  //结构出表单中的表单项的值，方便后续使用
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  //涉及提交，验证邮箱密码登陆
  const handleSubmit = async event => {
    //默认禁用
    event.preventDefault();

    try {
      //此函数类似signInWithGooglePopup，可以更新auth，更新auth后useEffect会更新数据库
      signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };
  //改变本地当前存储的值
  const handleChange = event => {
    const { name, value } = event.target;
    //...传播所有字段
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account ?</h2>
      <span>Sign in wit h your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />
        <FormInput
          label="Password"
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div className="buttons-container">
          <Button type="submit ">Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogle}>
            Google sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
