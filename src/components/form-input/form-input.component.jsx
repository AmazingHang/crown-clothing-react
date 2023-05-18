import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input
        className='form-input'
        {...otherProps}
        //otherPros指的是value=''这类的传入属性
      />

      {
        //如果存在label则。。。
        label && (
          <label
            className={`${
              otherProps.value.length ? 'shrink' : ''
            } form-input-label`} //添加shrink标签后达到缩小效果
          >
            {label}
          </label>
        )
      }
    </div>
  )
}
export default FormInput
