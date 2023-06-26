import Header from "../Header";

import CartContext from "../../context/cartContext";
import CartItem from "../CartItem";

import "./index.css";

const Cart = () => {
  return (
    <>
      <Header />
      <CartContext.Consumer>
        {(value) => {
          const { cartList } = value;
          console.log(cartList);
          return (
            <ul className="cart-ul">
              {cartList.map((eachCart) => (
                <CartItem key={eachCart.id} eachCart={eachCart} />
              ))}
            </ul>
          );
        }}
      </CartContext.Consumer>
    </>
  );
};

export default Cart;
