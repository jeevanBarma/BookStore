import { Link } from "react-router-dom";

import "./index.css";

const BookItem = (props) => {
  const { eachBook } = props;
  const { id, title, image_url } = eachBook;
  return (
    <Link className="link" to={`books/${id}`}>
      <li className="detail-view-li">
        <img className="img" src={image_url} alt={title} />
        <p className="bookItem-title">{title}</p>
      </li>
    </Link>
  );
};

export default BookItem;
