import react, { useState } from "react";
import { Redirect } from "react-router";
import Verification from "../verification/verification";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
import authentication from "../firebase";
import {RecaptchaVerifier,signInWithPhoneNumber  } from "firebase/auth";
import "./setting.css";
import Loader from "../loader/loader";
const Setting = (props) => {
  // console.log(tempuser)
    let tempuser = localStorage.getItem("user");
  let user = JSON.parse(tempuser);
  const [formValue, setFormValue] = useState({
    Name: user.name,
    Phone: user.mobile,
    Gender: user.gender,
    oldPassword:'',
    newPassword:'',
    confirmNewPassword:''
  });
  const [picture, setpicture] = useState();
  const [verify, setverify] = useState(false);
  const [load, setload] = useState(false);
  const [error, seterror] = useState({});
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
      }
    },authentication);
  };
  const validation = () => {
    const error = {};
    if (Name.trim() === "") { 
      error.Name = "username is require";
    } else if (Name.length < 3) {
      error.Name = "username must be bigger than 2";
    }
    if (oldPassword.trim() === "") {
      error.oldPassword = "password is require";
    } 
    if (newPassword.trim() === "") {
      error.newPassword = "password is require";
    } 
    if (confirmNewPassword.trim() === "") {
      error.confirmNewPassword = "password is require";
    } 
    else if (newPassword.length < 8) {
      error.newPassword= "password must be bigger than 8";
    }
    if (confirmNewPassword !== newPassword)
      error.confirmNewPassword = "must enter the same pass";
    if (Phone.trim() === "") error.Phone = "mobile is require";
    if (Gender === "") error.Gender = "gender is require";
    seterror(error)
    return Object.keys(error).length === 0 ? null : error;
  };
  const editbutton = (e) => {
 
    const editname = document.getElementById("editname");
    const editphone = document.getElementById("editphone");
    const editgender = document.getElementById("editgender");
    const editpass = document.getElementById("editpass");
    const cancel = document.getElementById("cancel");
    const inputsetting = document.getElementsByClassName("inputsetting");
    editname.onclick = () => {
      document.getElementById("inputname").removeAttribute("disabled");
      document.getElementById("saveandcancel").style.display = "block";
      document.getElementById("inputname").style.border = "1px solid white";
    };
    editphone.onclick = () => {
      document.getElementById("inputphone").removeAttribute("disabled");
      document.getElementById("saveandcancel").style.display = "block";
      document.getElementById("inputname").style.border = "1px solid white";
    };
    editgender.onclick = () => {
      document.getElementById("inputgender").removeAttribute("disabled");
      document.getElementById("saveandcancel").style.display = "block";
      document.getElementById("inputname").style.border = "1px solid white";
    };
    editpass.onclick = () => {
      document.getElementById("inputpass").removeAttribute("disabled");
      document.getElementById("hidepass").style.display = "block";
      document.getElementById("inputname").style.border = "1px solid white";
      document.getElementById("oldpass").textContent = "Enter Old Password";
      document.getElementById("saveandcancel").style.display = "block";
    };
    cancel.onclick = (e) => {
      // eslint-disable-next-line
      window.location.href = window.location.href;
      document.getElementById("saveandcancel").style.display = "none";
      document.getElementById("inputgender").value = user.gender;
      document.getElementById("inputname").value = user.name;
      document.getElementById("inputphone").value = user.mobile;
      for (let i = 0; i < inputsetting.length; i++) {
        inputsetting[i].setAttribute("disabled", "disabled");
      }
      document.getElementById("hidepass").style.display = "none";
      document.getElementById("oldpass").textContent = "Password";
      document
        .getElementById("inputgender")
        .setAttribute("disabled", "disabled");
    };
  };

  if (tempuser === null) {
    return <Redirect to="/" />;
  }

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
  const { Name, Phone, Gender,oldPassword,newPassword,confirmNewPassword } = formValue;
  const urldata = `https://backend-api-tabarani.herokuapp.com/api/users/${user.mobile}`;
  const handlesetting = async (e) => {
    e.preventDefault();
    const error = validation();
    if (error) return;
    setload(true)
    let data2 = await fetch(urldata,
      {
        method: "PATCH",
        body: JSON.stringify({
          name: Name,
          gender:Gender,
        }),
        headers: {
          "Content-Type": "application/json",
        API_KEY:
        '382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b',
      }
    }
    );
    let res2 = await data2.json();
    if (res2.status === "success") {
      setload(false)
      localStorage.setItem("user", JSON.stringify(res2.data));
      console.log(res2)
    }
    else{
      console.log("error")
    }
  
    let data = await fetch(
      `https://backend-api-tabarani.herokuapp.com/api/users/${Phone}`,
      {
        method: "GET",
        headers: {
        "Content-Type":"application/json",
        API_KEY:
        '382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b',
      }
    }
    );
    let res = await data.json();
    console.log(res);
    if (res.status === "success") {
      setload(false)
      const error = {};
      error.mobile = "this mobile already exist";
      seterror(error)
      console.log(error.mobile)
      return;
    }
  setUpRecaptcha()
  const phoneNumber ='+'+ Phone
const appVerifier = window.recaptchaVerifier;
signInWithPhoneNumber(authentication,phoneNumber, appVerifier)
    .then((confirmationResult) => {
     setload(false)
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
   setverify(true)
      window.confirmationResult = confirmationResult;
      console.log("sent");
    
    }).catch((error) => {
      setload(false)
    });

  };
  const fileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    console.log(file)
   
    formData.append('image', file, file.name);
    const url = `https://backend-api-tabarani.herokuapp.com/api/users/image/${user.mobile}`;
    // send image as a file
    const data = await fetch(url, {
      method: 'PATCH',
      body: formData,
      headers: {
        API_KEY:
          '382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b',
      },
    });
   let res = await data.json();
    if (res.status === "success") {
      console.log(res); 
      delete res.data._id;
      localStorage.setItem("user", JSON.stringify(res.data));
      user = res.data
      setpicture(user.image)
      document.getElementById("saveandcancel").style.display = "none";
    } else {
      console.log("errr");
    }
    console.log(data);
  };
  const renderPreview = () => {
    if (picture) {
      return <img id="profile" src={user.image} alt="your profile pic" />;
    } else {
      return <img src={user.image} alt="default profile pic" />;
    }
  };
  if (tempuser === null) {
    return <Redirect to="/" />;
  }
if(verify){
  return <Verification  phone={Phone} direct="updated" />
}
  return (
    <react.Fragment>
      {load? <Loader/>:null}
      <div id="sign-in-button"></div>
      <div className="setting">
        <div className="main-side">
          <Header r={props} />
          <div className="vi">
            <Navbar />
            <div className="vid-stream">
              <h2>Settings</h2>
              <div className="data">
                <form id="upload" onSubmit={handlesetting}>
                  <div className="proimg">
                    <div className="imgprof">{renderPreview()}</div>
                    <div className="image-editor">
                      <i className="fas fa-pen editpic"></i>
                      <input
                        type="file"
                        accept="image/*"
                        id="imginput"
                        onChange={fileUpload}
                      />
                    </div>
                  </div>

                  <div className="formdata">
                    <label htmlFor="username" className="form-label">
                      UserName
                    </label>
                    <div className="inputcout">
                      <i
                        id="editname"
                        className="fas fa-pen editbutton"
                        onClick={editbutton}
                      ></i>
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
                    {error.Name && (
                <span className="text-danger">{error.Name}</span>
              )}
                    <label htmlFor="username" className="form-label">
                      Phone Number
                    </label>
                    <div className="inputcout">
                      <i
                        id="editphone"
                        className="fas fa-pen editbutton"
                        onClick={editbutton}
                      ></i>
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
                    {error.Phone && (
                <span className="text-danger">{error.Phone}</span>
              )}
                    <label htmlFor="username" className="form-label">
                      Gender
                    </label>
                    <div className="inputcout">
                      <i
                        id="editgender"
                        className="fas fa-pen editbutton"
                        onClick={editbutton}
                      ></i>
                      <select
                        disabled
                        value={Gender}
                        id="inputgender"
                        onChange={handleChange}
                        name="Gender"
                      >
                        <option defaultValue hidden>
                          Gender
                        </option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    {error.Gender && (
                <span className="text-danger">{error.Gender}</span>
              )}
                    <label
                      id="oldpass"
                      htmlFor="username"
                      className="form-label"
                    >
                      Password
                    </label>
                    <div className="inputcout">
                      <i
                        id="editpass"
                        className="fas fa-pen editbutton"
                        onClick={editbutton}
                      ></i>
                      <input
                      disabled
                        id="inputpass"
                        className="inputsetting"
                        type="password"
                        onChange={handleChange}
                        name="oldPassword"
                      />
                    </div>
                    {error.oldPassword && (
                <span className="text-danger">{error.oldPassword}</span>
              )}
                    <div id="hidepass" className="hidepass">
                      <label htmlFor="username" className="form-label">
                        Enter New Password
                      </label>
                      <div className="inputcout">
                        <input
                          className="inputsetting"
                          type="password"
                          onChange={handleChange}
                          name="newPassword"
                        />
                      </div>
                      {error.newPassword && (
                <span className="text-danger">{error.newPassword}</span>
              )}
                      <label htmlFor="username" className="form-label">
                        Confirm New Password
                      </label>
                      <div className="inputcout">
                        <input
                          className="inputsetting"
                          type="password"
                          onChange={handleChange}
                            name="confirmNewPassword"
                        />
                      </div>
                      {error.confirmNewPassword && (
                <span className="text-danger">{error.confirmNewPassword}</span>
              )}
                    </div>
                    <div className="notification">
                      <span>Notification</span>
                      <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div id="saveandcancel" className="saveandcancel">
                    <button type="button" id="cancel" className="cancel">
                      cancel
                    </button>
                    <button type="submit" id="save" className="save">
                      save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};

export default Setting;
