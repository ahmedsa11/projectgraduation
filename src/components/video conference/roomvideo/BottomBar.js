import React,{useState} from "react";
import styled from "styled-components";
import phonealt from '../../../img/index 1.png'
import tool from '../../../img/MicrosoftTeams-image8) 1.png'
import socket from "../socket";
import ScrollToBottom from 'react-scroll-to-bottom';
const BottomBar = ({
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenRecod,
  speechRecognition,
  screenShare,
  toggleRecording,
  text,
  signToText,
  textsign,
  toSign,
  settoSign, 
  senderName,
  setsignToText,
  textcaption,
  roomId,
  setsignToTextCaption
}) => {
  const [sendNameStext,setsendNameStext]=useState("")
  const [sendNameVs,setsendNameVs]=useState("")
  socket.on("receive-text", ({name}) => {
    setsendNameVs(name)
  })
  socket.on("send_sender_name",({name})=>{
    setsendNameStext(name)
  })
  const opentool = () => {
    const tool = document.getElementsByClassName("to");
    for (let i = 0; i < tool.length; i++) {
      tool[0].onclick = () => {
        const sign = document.querySelector(".signlang");
        tool[0].classList.toggle("activetool"); 
        sign.classList.toggle("showsign");
        settoSign(signcheck => !signcheck)
        if(toSign){
          socket.emit("leave-sign-room",{roomId:roomId,id:"voicetosign"})}
       
        else{
          socket.emit("join-sign-room",{roomId:roomId,id:"voicetosign"})
        } 
      };
      tool[1].onclick = () => {
        const caption = document.querySelector(".caption");
        tool[1].classList.toggle("activetool");
        caption.classList.toggle("showsign");
      };
      tool[2].onclick = () => {
        const caption = document.querySelector(".captionsign");
        tool[2].classList.toggle("activetool");
        caption.classList.toggle("showsign");
        setsignToTextCaption(signcheck => !signcheck)
      };
      tool[3].onclick = () => {
        const signmedia = document.getElementById('canvas')
        tool[3].classList.toggle("activetool");
        
        signmedia.classList.toggle("showmediapipe");
        setsignToText(signcheck => !signcheck)
      };
    }
  };
  return (
    <React.Fragment>
     <span className="dottt"></span>
      <div className="footer">
        <div className="tools">
          <div className="dropdown">
            <button className="dropbtn">
              <img src={tool} alt="tool"/>Tools
            </button>
            <div className="dropdown-content">
              <ul>
                <li className="to" onClick={opentool}>
                  Voice To Sign
                </li>
                <li className="to" onClick={opentool}>
                  Caption Voice To Sign
                </li>
                <li className="to" onClick={opentool}>
                  Caption Sign To Text
                </li>
                <li className="to" onClick={opentool}>
                  Sign To Text
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="buttons">
        <span className="sendnameStext">{sendNameVs}</span>
        <div className="cp">
        <ScrollToBottom >
        <div className="caption lead text-center" id="textarea">
              <p className="pcap" ref={text}>
              </p>
            </div>
            </ScrollToBottom>
            </div>
           
            <span className="sendnameVtext">{sendNameStext}</span>
          <div className="cp">
          <ScrollToBottom >
            <div className="captionsign lead text-center" id="textarea">
        
              <p  className="pcaps" ref={textsign}>
              </p>
            </div>
              </ScrollToBottom>
          </div> 
          <ul>
            <li>
              <CameraButton onClick={toggleCameraAudio} data-switch="video">
                {userVideoAudio.video ? (
                  <i className="fas fa-video"></i>
                ) : (
                  <i className="fas fa-video-slash"></i>
                )}
              </CameraButton>
            </li>
            <li>
              <button id="au" onClick={toggleCameraAudio} data-switch="audio">
                {userVideoAudio.audio ? (
                  <i  className="fas fa-microphone"id="auo"></i>
                ) : (
                  <i className="fas fa-microphone-slash"id="auf"></i>
                )}
              </button>
            </li>
            <li>
              <button onClick={goToBack}id="phonealt" >
                <img src={phonealt}alt="phone"/>
              </button>
            </li>
            <li>
              <button onClick={toggleRecording}>
                
                {screenRecod? <i className="fas fa-stop"></i>: <i className="fas fa-record-vinyl"></i>}
              </button>
            </li>
            <li>
              <button onClick={clickScreenSharing}>
                <i
                  className={`fas fa-desktop ${
                    screenShare ? "sharing" : "fas fa-desktop"
                  }`}
                ></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
const CameraButton = styled.button`
  * {
    pointer-events: none;
  }
`;
export default BottomBar;