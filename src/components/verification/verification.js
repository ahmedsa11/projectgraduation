import react, { Component } from "react";
import "./verification.css";
import ver from "../../img/22.png";
import { Redirect } from "react-router";
// import firebase from "../firebase";
class Verification extends Component {
  state = {
    error: {},
    num1: "",
    num2: "",
    num3: "",
    num4: "",
    num5: "",
    num6: "",
    mobile: this.props.phone,
    code: "",
    username: this.props.username,
    pass: this.props.pass,
    gender: this.props.gender,
    very: "",
  };

  header = {
    API_KEY:
      "382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b",
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
  handlesubotp = async (e) => {
    e.preventDefault();
    // const error = this.validsignup();
    // if (error) return;
    //back end
    const code =
      this.state.num1 +
      this.state.num2 +
      this.state.num3 +
      this.state.num4 +
      this.state.num5 +
      this.state.num6;
    window.confirmationResult
      .confirm(code)
      .then(async (result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        console.log("goood");
        let data2 = await fetch(
          `https://backend-api-tabarani.herokuapp.com/api/users/`,
          {
            headers: this.header,
            method: "POST",
            body: JSON.stringify({
              name: this.state.username,
              mobile: this.state.mobile,
              password: this.state.pass,
              gender: this.state.gender,
            }),
          }
        );
        let res2 = await data2.json();
        if (res2.status === "success") {
          localStorage.setItem("user", JSON.stringify(res2.data));
          this.setState({
            very: "verified",
          });
        }
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("bad verification code");
      });
  };

  handlechangesignup = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };

  render() {
    if (this.state.very === "verified") {
      return (
        <react.Fragment>
          <Redirect to="/home" />
        </react.Fragment>
      );
    }
    return (
      <react.Fragment>
        <div className="container v">
          <img src={ver} alt="imag" />
          <h2 className="text-center">Verification code</h2>
          <p className="text-center">
            we have sent the code Verification to your mobile number
          </p>
          <h3 className="text-center">{this.state.mobile}</h3>

          <form onSubmit={this.handlesubotp}>
            <div className="code">
              <input
                required
                type="text"
                name="num1"
                onChange={this.handlechangesignup}
                maxLength={1}
              />
              <input
                required
                type="text"
                name="num2"
                onChange={this.handlechangesignup}
                maxLength={1}
              />
              <input
                required
                type="text"
                name="num3"
                onChange={this.handlechangesignup}
                maxLength={1}
              />
              <input
                required
                type="text"
                name="num4"
                onChange={this.handlechangesignup}
                maxLength={1}
              />
              <input
                required
                type="text"
                name="num5"
                onChange={this.handlechangesignup}
                maxLength={1}
              />
              <input
                required
                type="text"
                name="num6"
                onChange={this.handlechangesignup}
                maxLength={1}
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </react.Fragment>
    );
  }
}
export default Verification;
