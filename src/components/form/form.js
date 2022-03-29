import react, { Component } from "react";
import {Redirect, Link} from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./form.css";
import Verification from "../verification/verification";
import firebase from "../firebase";
import "firebase/compat/auth"
import "firebase/compat/firestore"
import Loader from "../loader/loader";
class Form extends Component {
  state = {
    username: "",
    mobile: "",
    pass: "",
    confirm: "",
    error: {},
    loginn: "",
    mobilelog: "",
    passlog: "",
    gender: "",
    loading:false
  };
  
  setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
       
      }
    });
  };
  repp = () => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const form = document.getElementById("formm");

    signUpButton.addEventListener("click", () => {
      form.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      form.classList.remove("right-panel-active");
    });
  };
  componentDidMount() {
    this.repp();
  }
  header = {
    API_KEY:
      "382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b",
    "Content-Type": "application/json",
    // 'Content-Type': 'application/x-www-form-urlencoded',
  };
  handlesubsignup = async (e) => {
    e.preventDefault();
    const error = this.validsignup();
    if (error) return;
    //back end
    let data = await fetch(
      `https://backend-api-tabarani.herokuapp.com/api/users/${this.state.mobile}`,
      {
        headers: this.header,
        method: "GET",
      }
    );
    let res = await data.json();
    this.setState({loading:true})
    console.log(res);
    if (res.status === "success") {
      this.setState({loading:false})
      const error = {};
      error.mobile = "this mobile already exist";
      this.setState({ error });
      
      return;
    }
    
  this.setUpRecaptcha()
 
  const phoneNumber ='+'+ this.state.mobile
const appVerifier = window.recaptchaVerifier;
firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
    .then((confirmationResult) => {
      this.setState({loading:false})
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      this.setState({
        loginn:"true"
      })
      window.confirmationResult = confirmationResult;
      console.log("sent");
    
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    alert("please try agin later");
    });
  };
  validsignup = () => {
    const error = {};
    if (this.state.username.trim() === "") {
      error.username = "username is require";
    } else if (this.state.username.length < 3) {
      error.username = "username must be bigger than 2";
    }
    if (this.state.pass.trim() === "") {
      error.pass = "password is require";
    } else if (this.state.pass.length < 8) {
      error.pass = "password must be bigger than 8";
    }
    
    if (this.state.confirm !== this.state.pass)
      error.confirm = "must enter the same pass";
    if (this.state.mobile.trim() === "") error.mobile = "mobile is require";
    if (this.state.gender === "") error.gender = "gender is require";
    this.setState({ error });
    return Object.keys(error).length === 0 ? null : error;
  };
  handlechangesignup = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  /*log in*/
  handlesublogin = async (e) => {
    e.preventDefault();
    const error = this.validlogin();
    if (error) return;
    //back end

    const url = "https://backend-api-tabarani.herokuapp.com/api/users/login";
    const data = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        API_KEY:
          "382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b",
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        mobile: this.state.mobilelog,
        password: this.state.passlog,
      }), // body data type must match "Content-Type" header
    });
    const res = await data.json();
    this.setState({loading:true})
    if (res.status === "error") {
      this.setState({loading:false})
      const error = {};
      error.mobilelog = res.message.mobile;
      error.passlog = res.message.password;
      this.setState({ error });
    }
    if (res.status === "success") {
      this.setState({loading:false})
      console.log(res);
      delete res.data._id;
      localStorage.setItem("user",JSON.stringify(res.data))
      this.setState({
        loginn:"login"
      })
    }
  };
  validlogin = () => {
    const error = {};
    if (this.state.mobilelog.trim() === "")
      error.mobilelog = "mobile is require";
    if (this.state.passlog.trim() === "") error.passlog = "password is require";
    this.setState({ error });
    return Object.keys(error).length === 0 ? null : error;
  };
  handlechangelogin = (e) => {
    let state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state);
  };
  render() {
    if (this.state.loginn === "true") {
      return (
        <react.Fragment>
          <Verification
            phone={this.state.mobile}
            username={this.state.username}
            pass={this.state.pass}
            gender={this.state.gender}
            co={this.onSubmitOtp}
          />
        </react.Fragment>
      );
    }
    if (this.state.loginn === "login") {

      return (
      <react.Fragment>
      <Redirect to="/home" />
      </react.Fragment>
      );    }
   
    return (
      <react.Fragment>
 {this.state.loading ? <Loader/>:null}
        <div id="sign-in-button"></div>
        <div className="form" id="formm">
          <div className="form-container sign-up" id="s">
            <form onSubmit={this.handlesubsignup}>
              
              <h1>Register</h1>
              <p className="text-center">create your new account </p>
              <div className="inputcontainer">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  name="username"
                  onChange={this.handlechangesignup}
                  placeholder="Name"
                />
              </div>
              {this.state.error.username && (
                <span className="text-danger">{this.state.error.username}</span>
              )}
              <div className="inputcontainer">
                <i className="fas fa-mobile-alt i"></i>
                <PhoneInput
                  name="mobile"
                  placeholder="phone number"
                  value={this.state.mobile}
                  onChange={(mobile) => this.setState({ mobile })}
                />
              </div>
              {this.state.error.mobile && (
                <span className="text-danger">{this.state.error.mobile}</span>
              )}
              <div className="inputcontainer">
                <i className="fas fa-lock"></i>
                <input
                  className="form-control"
                  type="password"
                  name="pass"
                  onChange={this.handlechangesignup}
                  placeholder="Password"
                />
              </div>
              {this.state.error.pass && (
                <span className="text-danger">{this.state.error.pass}</span>
              )}
              <div className="inputcontainer">
                <i className="fas fa-lock"></i>
                <input
                  className="form-control"
                  type="password"
                  name="confirm"
                  onChange={this.handlechangesignup}
                  placeholder="ConfirmPassword"
                />
              </div>
              {this.state.error.confirm && (
                <span className="text-danger">{this.state.error.confirm}</span>
              )}
              <select onChange={this.handlechangesignup} name="gender">
                <option defaultValue hidden>
                  Gender
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {this.state.error.gender && (
                <span className="text-danger">{this.state.error.gender}</span>
              )}
              <p className="agree">By creating an account you agree to our </p>
              <a href="https://www.w3schools.com/colors/colors_gradient.asp">
                tems of use and privacy policy
              </a>
              <button type="submit" className="signup">
                Sign Up
              </button>
              <p className="agree logg">
                Already have an account ?
                <a href="#l" className="log">
                  Login
                </a>
              </p>
              <br />
            </form>
          </div>
          <div className="form-container sign-in" id="l">
            <form onSubmit={this.handlesublogin}>
              <h1>Sign in</h1>
              <p className="text-center">enter your accout details </p>
              <div className="inputcontainer">
                <i className="fas fa-mobile-alt"></i>
                <input
                  type="number"
                  name="mobilelog"
                  onChange={this.handlechangelogin}
                  placeholder="phone number"
                />
              </div>
              {this.state.error.mobilelog && (
                <span className="text-danger">
                  {this.state.error.mobilelog}
                </span>
              )}
              <div className="inputcontainer">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  name="passlog"
                  onChange={this.handlechangelogin}
                  placeholder="Password"
                />
              </div>
              {this.state.error.passlog && (
                <span className="text-danger">{this.state.error.passlog}</span>
              )}
              <button type="submit" className="login">
                log in
              </button>
              <p className="agree logg">
                you need create account ?
                <a href="#s" className="log">
                  Register
                </a>
              </p>
              <Link to="/forget">forget your password..?</Link>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="go" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="go" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>)
      </react.Fragment>
    );
  }
}

export default Form;
