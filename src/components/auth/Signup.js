import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HttpStatus from "http-status-codes";
import swal from "sweetalert";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { signupValidation } from "../../utils/Validator";
import { SignupRequest } from "../../actions";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [error, setError] = useState(false);
  const [helperTexts, setHelperTexts] = useState([]);

  useEffect(() => {
    if (
      username.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim()
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [username, email, password, confirmPassword]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (password.trim() !== confirmPassword.trim()) {
      setError(true);
      setHelperTexts(["passwords don't match"]);
    } else {
      const fields = {
        username,
        password,
        email,
      };
      const { errors, isValid } = signupValidation(fields);

      if (isValid) {
        props.SignupRequest(fields, (res) => {
          if (res && res.status === HttpStatus.CREATED) {
            swal({
              title: "Welcome to Secret service!",
              text: "Your account has been created successfully!",
              icon: "success",
              button: "Continue",
            });
            return props.history.push("/dashboard");
          } else if (res && res.status === HttpStatus.UNPROCESSABLE_ENTITY) {
            setError(true);
            setHelperTexts(res.data.errors.map((error) => error.msg));
          } else if (res && res.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            setError(true);
            setHelperTexts([res.data.message]);
          }
        });
      } else {
        setError(true);
        setHelperTexts(Object.values(errors));
      }
    }
  };
  return (
    <>
      <div className="container">
        <div className="home-intro"></div>
        <div className="auth-section">
          <form>
            <div>
              <h2>Welcome to Secret Service</h2>
            </div>
            <div className="form-control">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                placeholder="Confirm Password"
                name="cpassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={onSubmit} disabled={btnDisabled}>
                Sign Up
              </button>
            </div>
            <div>
              <p>
                dont have an account <Link to="/">Sign in</Link>
              </p>
            </div>
            <div>
              <ul>
                {error
                  ? helperTexts.map((text) => (
                      <li style={{ color: "red" }}>{text}</li>
                    ))
                  : ""}
              </ul>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { SignupRequest })(withRouter(Signup));
