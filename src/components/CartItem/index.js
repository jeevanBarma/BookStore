import { AiFillCloseCircle } from "react-icons/ai";

import CartContext from "../../context/cartContext";

import "./index.css";

const CartItem = (props) => (
  <CartContext.Consumer>
    {(value) => {
      const { deleteCartItem } = value;
      const { eachCart } = props;
      const { id, title, authors, image_url } = eachCart;

      const onDeleteCartItem = () => {
        deleteCartItem(id);
      };

      return (
        <li className="cart-item">
          <div className="cart-img-title-author-container">
            <img className="cart-img" src={image_url} alt={title} />
            <div>
              <p className="cart-title">{title}</p>
              <p className="cart-author">{authors}</p>
            </div>
          </div>
          <button
            className="cart-delete-button"
            onClick={onDeleteCartItem}
            type="button"
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      );
    }}
  </CartContext.Consumer>
);

export default CartItem;
