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

  const editbutton=(e)=>{
  
    const editname=document.getElementById("editname");
    const editphone=document.getElementById("editphone");
    const editgender=document.getElementById("editgender");
    const editpass=document.getElementById("editpass");
    const cancel =document.getElementById("cancel");
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
    cancel.onclick=(e)=>{
     
      document.getElementById("saveandcancel").style.display="none"
      document.getElementById("inputgender").value=user.gender
      document.getElementById("inputname").value=user.name;
      document.getElementById("inputphone").value=user.mobile
      for (let i = 0; i < inputsetting.length; i++) {
          inputsetting[i].setAttribute('disabled','disabled')
         }
         document.getElementById("hidepass").style.display="none"
         document.getElementById("oldpass").textContent="Password"
         document.getElementById("inputgender").setAttribute('disabled','disabled')
    
      }
    }

  const tempuser = localStorage.getItem("user");
  let user = JSON.parse(tempuser);
  const [formValue, setFormValue] = useState({
    Name:user.name,
    Phone:user.mobile,
    Gender:user.gender,
  })
  // eslint-disable-next-line 
 const[picture,setpicture]=useState(false)
 const[src,setsrc]=useState(false)

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
  // const handlePictureSelected =(e)=> {
  //   let picture = e.target.files[0];
  //   let src     = URL.createObjectURL(picture);
  //   setpicture(picture);
  //   setsrc(src);
  // }
  const renderPreview=()=> {
    if(src) {
      return (
        <img id="profile" src={src} alt="your profile pic"/>
      );
    } else {
      return (
        <img src={proimg} alt="default profile pic"/>
      );
    }
  }
  function importData() {
    let input = document.createElement('input');
  
    input.type = 'file';
    input.onchange = (e) => {
      // you can use this method to get file and perform respective operations
      let picture = e.target.files[0];
    let src = URL.createObjectURL(picture);
    setpicture(picture);
    setsrc(src);
          };
    input.click();
    document.getElementById("saveandcancel").style.display="block"
    
  }
 const upload = async (e) => {
    e.preventDefault();
  const formData = new FormData();
  let image=document.getElementById("profile");
  formData.append('image',image)
  const url=`https://backend-api-tabarani.herokuapp.com/api/users/image/${user.mobile}`
  const res=await fetch(url,{
    method:'PATCH',
    body:formData,
    headers:{
      'Content-Type':'image/png',
      API_KEY:
      "382395e75d624fb1478303451bc7543314ffffac6372c2aa9beb22f687e6e886b77b3ee84aeeb1a8aabad9647686d0baaa4d9a7c65ff6ef1ebc71fcde7bac14b",
    },
  })
  if (res.status === "success") {
    console.log(res);
    delete res.data._id;
    localStorage.setItem("user",JSON.stringify(res.data))
    document.getElementById("saveandcancel").style.display="none"
  } 
  else{
    console.log("errr")
  }
}
 


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
              <form id="upload">
                <div className="proimg">
              <div className="imgprof">
                    {renderPreview()}
                    </div>
                    <i className="fas fa-pen editpic" onClick={importData}></i>
               
                </div>
              
                <div className="formdata">
                  <label htmlFor="username" className="form-label">
                    UserName
                  </label>
                  <div className="inputcout">
                    <i id="editname" className="fas fa-pen editbutton"onClick={editbutton}></i>
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
                    <i id="editphone" className="fas fa-pen editbutton"onClick={editbutton}></i>
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
                  <i id="editgender" className="fas fa-pen editbutton"onClick={editbutton}></i>
                    <select disabled  value={Gender} id="inputgender"  onChange={handleChange} name="Gender">
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
                    <i id="editpass" className="fas fa-pen editbutton"onClick={editbutton}></i>
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
                  <button  id="cancel" className="cancel">cancel</button>
                  <button onClick={upload}  id="save" className="save">save</button>
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
