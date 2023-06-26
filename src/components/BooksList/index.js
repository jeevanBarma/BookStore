import { Component } from "react";
import BookItem from "../BookItem";
import Cookies from "js-cookie";
import { ThreeCircles } from "react-loader-spinner";

import "./index.css";

const apiConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  isProgress: "ISPROGRESS"
};

class BooksList extends Component {
  state = {
    apiStatus: apiConstants.initial,
    booksList: [],
    searchInput: ""
  };

  componentDidMount() {
    this.getBookList();
  }

  getBookList = async () => {
    this.setState({
      apiStatus: apiConstants.isProgress
    });
    const jwt = Cookies.get("jwt_token");
    console.log(jwt);
    const { searchInput } = this.state;
    const url = `https://example-data.draftbit.com/books?_limit=100`;
    const options = {
      method: "GET"
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      this.setState({
        booksList: data,
        apiStatus: apiConstants.success
      });
    } else {
      this.setState({
        apiStatus: apiConstants.failure
      });
    }
  };

  progressView = () => (
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
  );

  successView = () => {
    const { booksList } = this.state;
    const length = booksList.length === 0;
    return length ? (
      <div className="no-book-container">
        <img
          className="no-book-img"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no books"
        />
        <h1 className="no-book-heading">No Books </h1>
        <p className="no-book-desc">We could not find any books. Try again.</p>
      </div>
    ) : (
      <ul className="book-list-ul">
        {booksList &&
          booksList.map((eachBook) => (
            <BookItem key={eachBook.id} eachBook={eachBook} />
          ))}
      </ul>
    );
  };

  failureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button className="retry-button" type="button">
        Retry
      </button>
    </div>
  );

  getRenderData = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiConstants.success:
        return this.successView();
      case apiConstants.failure:
        return this.failureView();
      case apiConstants.isProgress:
        return this.progressView();
      default:
        return null;
    }
  };

  onChangeSearchInput = (e) => {
    this.setState({
      searchInput: e.target.value
    });
  };

  onKeyDownChange = (event) => {
    const { booksList, searchInput } = this.state;
    if (event.key === "Enter") {
      const serachedList = booksList.filter((book) =>
        book.title.toLowerCase().includes(searchInput)
      );
      this.setState({
        booksList: serachedList,
        searchInput: ""
      });
    }
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="booklist-container">
        <div className="booklist-input-container">
          <input
            type="search"
            className="input"
            id="search"
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onKeyDownChange}
            value={searchInput}
          />
        </div>
        {this.getRenderData()}
      </div>
    );
  }
}

export default BooksList;
