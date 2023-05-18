import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//在此开始
const SignUpForm = () => {
  //存储本地表单变量
  const [formFields, setFormFields] = useState(defaultFormFields);
  //结构出表单中的表单项的值，方便后续使用
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  //涉及提交
  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }

    try {
      //先用response测试数据返回格式，然后找出关键项user
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
    } catch (err) {
      console.log("user-creation encountered an error", err);
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
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />
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
        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <Button type="submit ">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
