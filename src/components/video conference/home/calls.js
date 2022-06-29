import react from 'react';
import './calls.css';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router';
import logoutimg from '../../../img/logout.png';
import { useState } from 'react';
const Calls = () => {
  const [roomName, setroomName] = useState('');
  const [type, settype] = useState('');
  let history = useHistory();
  function clickJoinVideo() {
    const id = uuid();
    history.push(`/roomvideo/${id}`);
  }
  function clickJoinAudio() {
    const id = uuid();
    history.push(`/roomaudio/${id}`);
  }
  const logou = useHistory();
  const logout = () => {
    window.localStorage.removeItem('user');
    logou.push('/');
  };
  const go = () => {
    if (type === 'video') {
      clickJoinVideo();
    } else if (type === 'audio') {
      clickJoinAudio();
    }
  };
  const openpopup = () => {
    let popup = document.querySelector('.popup-wrapper');
    let popupBtn = document.querySelectorAll('.popup-open');
    let popupClose = document.querySelector('.close-btn');
    popupBtn.forEach(btn =>{
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        showPopup();
    })
    });

    popupClose.addEventListener('click', (e) => {
      e.preventDefault();
      removePopup();
    });

    popup.addEventListener('click', (e) => {
      let target = e.target;
      if (target.classList.contains('popup-wrapper')) {
        removePopup();
      } else return;
    });

    function showPopup() {
      popup.classList.add('active');
    }
    function removePopup() {
      popup.classList.remove('active');
    }
  };
  const videomeet =()=>{
    settype("video")
  }
  const audiomeet =()=>{
    settype("audio")
  }
  const joinvideo=()=>{
    openpopup();
    videomeet();
  }
  const joinaudio=()=>{
    openpopup();
    audiomeet();
  }
  console.log(roomName);
  return (
    <react.Fragment>
      <div className="lst">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="callaudio">
                <div className="overlay"></div>
                <i
                  className="fas fa-phone-alt popup-open"
                  onClick={joinaudio}
                ></i>
                <div className="tit">New voice call</div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="callvideo">
                <div className="overlay"></div>
                <i className="fas fa-video popup-open" onClick={joinvideo}></i>
                <div className="tit">New video call</div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="logimg">
                <div className="overlay"></div>
                <div className="options">
                  <div className="popup-wrapper">
                    <div className="popup">
                      <button className="close-btn">
                        <i className="fas fa-times"></i>
                      </button>
                      <input
                        type="text"
                        placeholder="Enter the room name"
                        onChange={(e) => setroomName(e.target.value)}
                      />
                      <button onClick={go}>Go</button>
                    </div>
                  </div>
                </div>
                <img src={logoutimg} alt="a" onClick={logout} />
                <div className="tit">Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};
export default Calls;
