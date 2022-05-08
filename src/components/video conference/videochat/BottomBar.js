import React from "react";
import styled from "styled-components";
import phonealt from '../../../img/index 1.png'
import tool from '../../../img/MicrosoftTeams-image8) 1.png'
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
  setsignToText
}) => {
  // function captiontext(){
  //   userVideoAudio.audio ? (
  //     speechRecognition.start()
  //   ) : (
  //     speechRecognition.stop()
  //   )
  // }

  const opentool = () => {
    const tool = document.getElementsByClassName("to");
    for (let i = 0; i < tool.length; i++) {
      //   tool[i].onclick=()=>{
      //     tool[i].classList.toggle("activetool")
      //  }
      tool[0].onclick = () => {
        const sign = document.querySelector(".signlang");
        tool[0].classList.toggle("activetool");
        sign.classList.toggle("showsign");
        settoSign(signcheck => !signcheck)
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
        setsignToText(signcheck => !signcheck)
      };
      tool[3].onclick = () => {
        const signmedia = document.getElementById('canvas')
        tool[3].classList.toggle("activetool");
        signmedia.classList.toggle("showmediapipe");
        setsignToText(signcheck => !signcheck)
      };
    }
  };

  // const captionEndRef = useRef(null);
  //   useEffect(() => {scrollToBottom()}, [text])
  //   const scrollToBottom = () => {
  //     captionEndRef.current.scrollIntoView({ behavior: 'smooth'});
  //   }
  return (
    <React.Fragment>
      <div className="footer">
        <div className="tools">
          <div className="dropdown">
            <button className="dropbtn">
              <img src={tool} alt="tool"/>Tools
            </button>
            <div className="dropdown-content">
              <ul>
                <li className="to" onClick={opentool}>
                  Sign Language
                </li>
                <li className="to" onClick={opentool}>
                  Caption
                </li>
                <li className="to" onClick={opentool}>
                  Caption SignToText
                </li>
                <li className="to" onClick={opentool}>
                  Sign To Text
                </li>
             
              </ul>
            </div>
          </div>
        </div>
        <div className="buttons">
          <div className="cp">
            <div className="caption lead text-center" id="textarea">
              <p className="pcap" ref={text}></p>
            </div>
            <div className="captionsign lead text-center" id="textarea">
              <p className="pcaps" ref={textsign}></p>
            </div>
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
              <button id="a" onClick={toggleCameraAudio} data-switch="audio">
                {userVideoAudio.audio ? (
                  <i className="fas fa-microphone"></i>
                ) : (
                  <i className="fas fa-microphone-slash"></i>
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
