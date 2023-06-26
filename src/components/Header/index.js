import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

const Header = () => {
  const naviagte = useNavigate();

  const onChangeLogoutButton = () => {
    Cookies.remove("jwt_token");
    naviagte("/login");
  };

  return (
    <nav className="header-main-container">
      <div className="logo-container">
        <Link className="link" to="/">
          <p className="logo-name">BookStore</p>
        </Link>
      </div>
      <ul className="header-ul">
        <Link className="link" to="/">
          <li className="header-li">Home</li>
        </Link>
        <Link className="link" to="/cart">
          <li className="header-li">cart</li>
        </Link>
      </ul>
      <button
        type="button"
        className="logout-button"
        onClick={onChangeLogoutButton}
      >
        LogOut
      </button>
    </nav>
  );
};

export default Header;
