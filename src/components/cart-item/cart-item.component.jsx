import "./cart-item.styles.scss";

//CartItem是指购物车里的物品项
const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span>
          {quantity}*${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
