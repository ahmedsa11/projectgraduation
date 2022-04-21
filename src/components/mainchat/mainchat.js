import react from "react";
import './mainchat.css';
import { Redirect } from "react-router";
import Header from "../video conference/home/header";
import Navbar from "../video conference/navbar/navbar";
import i from "../../img/download.png"
import chats from "../../img/download.png"
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
                <div className="lst">
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                <div className="cont">
                <div className="continfo"> <img src={chats} alt="a" />
                <div>
                  <span className="username">ahmed</span>
                  <span className="usernumber">01066923650</span>
                </div>
                </div> 
                  <div className="nummsg">
                  <span>3</span></div>

                </div>
                </div>
                </div>
                <div className="chatarea">
                   <img src={i} alt="icon"/>
                   <p>Now send and recieve message with<br/> your contacts</p>
                </div>
                
                </div>
          </div>
          </div></div>
    </react.Fragment>
  );
};
export default Mainchat;
