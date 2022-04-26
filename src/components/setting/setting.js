import react, { useState } from "react";
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

  const editbutton=()=>{
    const editname=document.getElementById("editname");
    const editphone=document.getElementById("editphone");
    const editgender=document.getElementById("editgender");
    const editpass=document.getElementById("editpass");
    const cancel =document.getElementById("cancel");
    const save =document.getElementById("save");
    const inputsetting=document.getElementsByClassName("inputsetting");
    editname.onclick=()=>{
      document.getElementById("inputname").removeAttribute("disabled");
      document.getElementById("saveandcancel").style.display="block"
    }
    editphone.onclick=()=>{
      document.getElementById("inputphone").removeAttribute("disabled");
      document.getElementById("saveandcancel").style.display="block"
    }
    editgender.onclick=()=>{
      document.getElementById("inputgender").removeAttribute("disabled");
      document.getElementById("saveandcancel").style.display="block"
    }
    editpass.onclick=()=>{
      document.getElementById("inputpass").removeAttribute("disabled");
      document.getElementById("hidepass").style.display="block"
      document.getElementById("oldpass").textContent="Enter Old Password"
      document.getElementById("saveandcancel").style.display="block"
    }
    cancel.onclick=()=>{
      document.getElementById("saveandcancel").style.display="none"
      for (let i = 0; i < inputsetting.length; i++) {
          inputsetting[i].setAttribute('disabled','disabled');
         }
         document.getElementById("hidepass").style.display="none"
         document.getElementById("oldpass").textContent="Password"
         document.getElementById("inputgender").setAttribute('disabled','disabled');
      }
    }

  const tempuser = localStorage.getItem("user");
  let user = JSON.parse(tempuser);
  const [formValue, setFormValue] = useState({
    Name:user.name,
    Phone:user.mobile,
    Gender:user.gender,
  })
 
  // console.log(tempuser)
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const { Name ,Phone,Gender } = formValue;
  if (tempuser === null) {
    return <Redirect to="/" />;
  }
 
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
                    <i id="editname" class="fas fa-pen editbutton"onClick={editbutton}></i>
                    <input
                    id="inputname"
                      className="inputsetting"
                      type="text"
                      value={Name}
                      disabled
                      name="Name"
                      onChange={handleChange}
                    />
                  </div>

                  <label htmlFor="username" className="form-label">
                    Phone Number
                  </label>
                  <div className="inputcout">
                    <i id="editphone" class="fas fa-pen editbutton"onClick={editbutton}></i>
                    <input
                    id="inputphone"
                      className="inputsetting"
                      type="tel"
                      value={Phone}
                      disabled
                      onChange={handleChange}
                      name="Phone"
                    />
                  </div>
                  <label htmlFor="username" className="form-label">
                    Gender
                  </label>
                  <div className="inputcout">
                  <i id="editgender" class="fas fa-pen editbutton"onClick={editbutton}></i>
                    <select disabled value={Gender} id="inputgender"  onChange={handleChange} name="Gender">
                      <option defaultValue hidden>
                        Gender
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                  <label id="oldpass" htmlFor="username" className="form-label">
                    Password
                  </label>
                  <div className="inputcout">
                    <i id="editpass" class="fas fa-pen editbutton"onClick={editbutton}></i>
                    <input
                    id="inputpass"
                      className="inputsetting"
                      type="password"
                      value={user.password}
                    />
                  </div>
                  <div id="hidepass" className="hidepass">
                  <label htmlFor="username" className="form-label">
                    Enter New Password
                  </label>
                  <div className="inputcout">
                  
                    <input
                    
                      className="inputsetting"
                      type="password"
                      value={user.password}
                    />
                  </div>
                  <label htmlFor="username" className="form-label">
                    Confirm New Password
                  </label>
                  <div className="inputcout">
                    
                    <input
                  
                      className="inputsetting"
                      type="password"
                      value={user.password}
                    />
                  </div>
                  </div>
                  <div className="notification">
                    <span>Notification</span>
                    <label class="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
                <div id="saveandcancel" className="saveandcancel">
                  <button  id="cancel" className="cancel">cancel</button>
                  <button  id="save" className="save">save</button>
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
