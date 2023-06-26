import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";

import Header from "../Header";
import CartContext from "../../context/cartContext";

import "./index.css";

const BookDetails = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  useEffect(() => {
    const getbook = async () => {
      const response = await fetch(
        `https://example-data.draftbit.com/books/${id}`
      );
      const data = await response.json();
      setBook(data);
      setLoading(false);
    };
    return () => getbook();
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <div className="spinner">
          <ThreeCircles
            height="60"
            width="60"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      ) : (
        <CartContext.Consumer>
          {(value) => {
            const { addCartItem } = value;
            const onClickAddToCart = () => {
              addCartItem({ ...book });
            };
            return (
              <div className="bookDetail-main-container">
                <div className="bookDetail-right-container">
                  <img
                    className="bookDetail-img"
                    src={book.image_url}
                    alt={book.title}
                  />
                  <h3 className="bookDetail-title">
                    Title:<span className="bookDetail-span">{book.title}</span>
                  </h3>
                  <h3 className="bookDetail-title">
                    Author:
                    <span className="bookDetail-span">{book.authors}</span>
                  </h3>
                </div>
                <hr />
                <div className="bookDetail-left-container">
                  <h3 className="bookDetail-title">
                    Description:
                    <span className="bookDetail-span">{book.description}</span>
                  </h3>
                  <div className="author-genres-container">
                    <h4 className="bookDetail-title">
                      Genres:
                      <br />
                      <span className="bookDetail-span">{book.genres}</span>
                    </h4>
                    <h4 className="bookDetail-title">
                      {" "}
                      Rating:
                      <br />
                      <span className="bookDetail-span">{book.rating}/5</span>
                    </h4>
                  </div>
                  <button
                    type="button"
                    className="button"
                    onClick={onClickAddToCart}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            );
          }}
        </CartContext.Consumer>
      )}
    </div>
  );
};
export default BookDetails;
