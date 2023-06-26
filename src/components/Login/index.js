import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/"
    });
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowErrMsg(true);
  };

  const onSubmitForm = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const apiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    };

    const response = await fetch(apiUrl, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    } else {
      onSubmitFailure(data.error_msg);
    }
  };

  useEffect(() => {
    onSubmitForm();
  }, [userDetails]);

  const renderPasswordForm = () => (
    <>
      <label className="label" htmlFor="password">
        PASSWORD
      </label>
      <input
        className="username-input-field"
        type="password"
        id="password"
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails((prevState) => ({
            ...prevState,
            password: e.target.value
          }))
        }
        placeholder="password:rahul@2021"
      />
    </>
  );

  const renderUsernameForm = () => (
    <>
      <label className="label" htmlFor="username">
        USERNAME
      </label>
      <input
        className="username-input-field"
        type="text"
        onChange={(e) =>
          setUserDetails((prevState) => ({
            ...prevState,
            username: e.target.value
          }))
        }
        id="username"
        value={userDetails.username}
        placeholder="username:rahul"
      />
    </>
  );

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={onSubmitForm}>
        <div className="input-container">{renderUsernameForm()}</div>
        <div className="input-container">{renderPasswordForm()}</div>
        <button className="login-button" type="submit">
          Login
        </button>
        {showErrMsg ? <p className="error-message">*{errorMsg}</p> : null}
      </form>
    </div>
  );
};

export default Login;
