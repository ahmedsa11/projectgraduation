import react, { useState } from "react";
import { Redirect } from "react-router";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
import "./setting.css";
const Setting = (props) => {
  // console.log(tempuser)
    let tempuser = localStorage.getItem("user");
  let user = JSON.parse(tempuser);
  const [formValue, setFormValue] = useState({
    Name: user.name,
    Phone: user.mobile,
    Gender: user.gender,
  });
  const [picture, setpicture] = useState();
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
  const { Name, Phone, Gender } = formValue;
  // const urldata = `https://backend-api-tabarani.herokuapp.com/api/users/${user.mobile}`;
  const handlesetting = async (e) => {
    e.preventDefault();
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
