import { Group, Input, FormInputLabel } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group>
      <Input
        {...otherProps}
        //otherPros指的是value=''这类的传入属性
      />
      {
        //如果存在label，length为0返回false，非0返回true
        label && (
          <FormInputLabel shrink={otherProps.value.length}>
            {label}
          </FormInputLabel>
        )
      }
    </Group>
  );
};
export default FormInput;
