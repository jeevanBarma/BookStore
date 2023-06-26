import { Component } from "react";

import Header from "../Header";
import BooksList from "../BooksList";

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <BooksList />
      </>
    );
  }
}

export default Home;
