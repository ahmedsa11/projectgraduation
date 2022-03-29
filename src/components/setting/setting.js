import react from "react";
import { Redirect } from "react-router";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
import proimg from "../../img/download.png";
import "./setting.css";
const Setting = (props) => {
  // handlesub=async e=>{
  //     e.preventDefault();
  //     const error=this.valid();
  // if(error)return;
  //     //back end
  //    //s const url="https://backend-api-tabarani.herokuapp.com/api/users";

  // };
  // valid = () =>{
  //     const error={};
  //     if(this.state.mobile.trim()==="")
  //     error.username="mobile is require";
  //     if(this.state.pass.trim()==="")
  //     error.pass="password is require";
  //     if(this.state.confirm!==this.state.pass)
  //     error.confirm="must enter the same pass";
  //     if(this.state.code.trim()==="")
  //     error.pass="coder is require";
  //     this.setState({error})
  //     return Object.keys(error).length===0 ? null:error;
  // };
  // handlechange=(e)=>{
  // let state={...this.state};
  // state[e.currentTarget.name]=e.currentTarget.value;
  // this.setState(state);
  // };
  const tempuser = localStorage.getItem("user");
  // console.log(tempuser)
  if (tempuser === null) {
    return <Redirect to="/" />;
  }
  const user = JSON.parse(tempuser);
  return (
    <react.Fragment>
      <div className="setting">
        <div className="main-side">
          <Header r={props} />
          <div className="vi">
            <Navbar />
            <div className="vid-stream">
              <h2>Settings</h2>
              <div className="data">
                <div className="proimg">
                  <form>
                    <img src={proimg} alt="your profile pic" />
                    <i class="fas fa-pen editpic"></i>
                  </form>
                </div>
                <div className="formdata">
                  <label htmlFor="username" className="form-label">
                    UserName
                  </label>
                  <div className="inputcout">
                    <i class="fas fa-pen editbutton"></i>
                    <input
                      className="inputsetting"
                      type="text"
                      value={user.name}
                      disabled
                    />
                  </div>

                  <label htmlFor="username" className="form-label">
                    Phone Number
                  </label>
                  <div className="inputcout">
                    <i class="fas fa-pen editbutton"></i>
                    <input
                      className="inputsetting"
                      type="tel"
                      value={user.mobile}
                      disabled
                    />
                  </div>
                  <label htmlFor="username" className="form-label">
                    Gender
                  </label>
                  <div className="inputcout">
                    <select disabled value={user.gender} name="gender">
                      <option defaultValue hidden>
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <label htmlFor="username" className="form-label">
                    Password
                  </label>
                  <div className="inputcout">
                    <i class="fas fa-pen editbutton"></i>
                    <input
                      className="inputsetting"
                      type="password"
                      value={user.password}
                    />
                  </div>
                  <div className="notification">
                    <span>Notification</span>
                    <label class="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div className="saveandcancel">
                  <button className="cancel">cancel</button>
                  <button className="save">save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};

export default Setting;
