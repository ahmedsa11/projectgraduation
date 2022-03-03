import React from 'react';
import styled from 'styled-components';
const opentool = () => {
    const tool = document.getElementsByClassName('to');
    for (let i = 0; i < tool.length; i++) {
      //   tool[i].onclick=()=>{
      //     tool[i].classList.toggle("activetool")
      //  }
      tool[0].onclick = () => {
        const sign = document.querySelector('.signlang');
        tool[0].classList.toggle('activetool');
        sign.classList.toggle('showsign');
      };
      tool[1].onclick = () => {
        const caption = document.querySelector('.caption');
        tool[1].classList.toggle('activetool');
        caption.classList.toggle('showsign');
      };
    }
  };
  
const BottomBar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  speechRecognition,
  screenShare,
  videoDevices,
  showVideoDevices,
  text,
  setShowVideoDevices
}) => {
  return (
    <React.Fragment>
    <div className='footer'>
            <div className='tools'>
              <div className='dropdown'>
                <button className='dropbtn'>
                  <i className='fas fa-border-all'> Tools</i>
                </button>
                <div className='dropdown-content'>
                  <ul>
                    <li className='to' onClick={opentool}>
                      Sign Language
                    </li>
                    <li className='to' onClick={opentool}>
                      Caption
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='buttons'>
              <div className='cp'>
              <div className='caption lead text-center'id="textarea"ref={text}></div></div>
              <ul>
                <li>
                 
                  <CameraButton onClick={toggleCameraAudio} data-switch='video'> 
                    {userVideoAudio.video? (
                    <i className='fas fa-video'></i>) : (<i className='fas fa-video-slash'></i>)}
                 
                 </CameraButton>
                </li>
                <li>
                  <button id='a' onClick={toggleCameraAudio} data-switch='audio'>
              
                  {userVideoAudio.audio ? (
              <i className='fas fa-microphone'></i> ): (<i className='fas fa-microphone-slash'></i>)}
               {userVideoAudio.audio ? ()=>speechRecognition.start():()=> speechRecognition.stop()}
                  </button>
            
                </li>
                <li>
                  <button onClick={goToBack}>
                    <i className='fas fa-phone-alt'></i>
                  </button>
                </li>
                <li>
                  <button>
                    <i className='fas fa-record-vinyl'></i>
                  </button>
                </li>
                <li>
                  <button onClick={clickScreenSharing}>
                <i className={`fas fa-desktop ${screenShare ? 'sharing':'fas fa-desktop' }`}></i> 
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