import react from "react";
import './mainchat.css';
import { Redirect } from "react-router";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
import i from "../../img/download.png"
import Chathome from "../video conference/home/chathome";
const Mainchat = () => {
  const tempuser = localStorage.getItem("user");
  // console.log(tempuser)
  if (tempuser === null) {
    return <Redirect to="/" />;
  }
  // const user = JSON.parse(tempuser);
  return (
    <react.Fragment>
        <div className="mainchat">

        <div className="main-side">
        <Header/>
        <div className="vi">
            <Navbar />
            <div className="vid-stream">
                <div className="contacts">
                    <Chathome/>
                </div>
                <div className="chatarea">
                   <img src={i} alt="icon"/>
                </div>
                </div>
          </div>
          </div></div>
    </react.Fragment>
  );
};
export default Mainchat;
