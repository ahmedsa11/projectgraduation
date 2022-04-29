import react, { Component } from "react";
import "./verification.css";
import firebase from "../firebase";
import { Redirect } from "react-router";
import verify from '../../img/vecteezy_identity-biometric-verification_ 1.png'
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
  sendagain=()=>{
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
  }
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
        <div className="verification">
      <div className="about-us">
        <div className="info-box">
          <h2>Enter verification code</h2>
          <p> We have sent the Verification code to </p> <p className="mobile"> {this.state.mobile} +201066923650</p>
         
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
            <span onClick={this.sendagain}>send the code again</span>
            <button type="submit">Verify</button>
          </form>
        </div>
        <div className="image-box">
          <img src={verify} alt="verification"/>
        </div>
      </div>
    </div>
    {/* <div className="verification">
      <div className="about-us">
        <div className="row">
          <div className="col-md-6">
        <div className="info-box">
          <h2>Enter verification code</h2>
          <p> We have sent the Verification code to <br/> {this.state.mobile} </p>
         
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
            <span>send the code again</span>
            <button type="submit">Verify</button>
          </form>
        </div>
        </div>
        <div className="col-md-6">
        <div className="image-box">
          <img src={verify} alt="verification"/>
        </div>
        </div>
      </div>
      </div>
    </div> */}
      </react.Fragment>
    );
  }
}
export default Verification;
