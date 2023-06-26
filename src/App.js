import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import CartContext from "./context/cartContext";

class App extends Component {
  state = {
    cartList: []
  };

  addCartItem = (book) => {
    this.setState((prevState) => ({ cartList: [...prevState.cartList, book] }));
  };

  deleteCartItem = (id) => {
    const { cartList } = this.state;
    const updatedCartList = cartList.filter(
      (eachCartItem) => eachCartItem.id !== id
    );
    this.setState({
      cartList: updatedCartList
    });
  };

  render() {
    const { cartList } = this.state;
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem
          }}
        >
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/books/:id" element={<BookDetails />} />
              <Route exact path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </CartContext.Provider>
      </BrowserRouter>
    );
  }
}
export default App;
