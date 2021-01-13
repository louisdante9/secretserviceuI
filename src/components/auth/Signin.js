import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SigninRequest } from "../../actions";
import swal from "sweetalert";

import { validateFormInput } from "../../utils/Validator";
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [email, password]);

  const onSubmit = (event) => {
    event.preventDefault();
    const { errors } = validateFormInput({ email, password });
    if (errors.invalidEmail) {
      let errorMessage = { icon: "warning" };
      errors.invalidEmail
        ? (errorMessage.title = errors.invalidEmail)
        : (errorMessage.title = "Oops!, You seem to have missed some fields");
      swal(errorMessage);
    }

    let obj = { email, password };
    props
      .SigninRequest(obj)
      .then(() => {
        props.history.push("/dashboard");
      })
      .catch((err) => {
        swal({
          title: "Oops!, sorry username or password is wrong",
          icon: "warning",
        });
        return err;
      });
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
              <label htmlFor="email">Email</label>
              <input type="text" 
              name="email"
              onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button onClick={onSubmit} disabled={btnDisabled}>
                Get Started
              </button>
            </div>
            <div>
              <p>
                dont have an account <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default connect(null, { SigninRequest })(withRouter(Signin));
