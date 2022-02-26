import react from 'react';
import React from 'react';
import chat from '../../../img/download.png';
import './home.css';
import Navbar from '../navbar/navbar';
import { v4 as uuid } from "uuid";
import '../navbar/navbar.css';
import { Redirect } from 'react-router';
const openchat = () => {
  const icon = document.querySelector('.dots');
  icon.onclick = () => {
    document.querySelector('.lst').classList.toggle('open');
    document.querySelector('.prof').classList.toggle('openhome');
    document.querySelector('.dots').classList.toggle('act');
  };
};
const Home = (props) => {
  const tempuser=localStorage.getItem("user");
  console.log(tempuser)
  if(tempuser===null){
    return(
      <Redirect to="/"/>
    );
  }

const user= JSON.parse(tempuser);
  console.log(user);

  // const roomRef = useRef();
  // const userRef = useRef();

  // function clickJoin() {
  //   // const roomName = roomRef.current.value;
  //   // // const userName = userRef.current.value;
  //   // // sessionStorage.setItem('user', userName);
  //   // props.history.push(`/room/${roomName}`);
  // }
  function clickJoin() {
    const id = uuid();
    props.history.push(`/room/${id}`);
}
  return (
    <react.Fragment>
      <div className='home'>
        <div className='main-side' id='main'>
          <div className='navbar'>
            <div className='container'>
              <div className='logo'>
                <i className='fas fa-american-sign-language-interpreting'></i>
              </div>
              <div className='title'>
                <input type='search' placeholder='search' />{' '}
                <i className='fas fa-phone-alt'></i>
                <i className='fas fa-video'onClick={clickJoin} >
                 
                </i>
              </div>
              <div className='grid-show'>
                <img src={chat} alt='a' /> <span>{user.name}</span>
              </div>
            </div>
          </div>
          <div className='vi'>
            <Navbar />
            <i className='fas fa-comment-dots dots' onClick={openchat}></i>
            <div className='vid-stream'>
              <div className='row'>
                <div className='col-lg-4'>
                  <div className='lst'>
                    <a href='#direct'>Direct</a>
                    <a href='#group'>Group</a>
                    <a href='#archive'>Archive</a>
                    <div className='direct' id='direct'>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:1125</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:1315</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:775</span>
                      </div>
                    </div>
                    <div className='group' id='group'>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:175</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:195</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:135</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:215</span>
                      </div>
                    </div>
                    <div className='archive' id='archive'>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:5</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:85</span>
                      </div>
                      <div className='cont'>
                        {' '}
                        <img src={chat} alt='a' />
                        <span>09:95</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-8'>
                  <div className='prof'>
                    <div className='pic'>
                      <img src={chat} alt='a' />
                    </div>
                    <h3>Meeting history</h3>
                    <div className='history'>
                      <div className='row'>
                        <div className='col-md-4'>
                          <div className='dailymeeting'>
                            <i className='fas fa-ellipsis-h'></i>
                            <h4>Daily Meeting</h4>
                            <ul>
                              <li>David alba (host)</li>
                              <li>26 participants </li>
                            </ul>
                            <div className='im'>
                              {' '}
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                            </div>
                            <span>1 hour</span>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='dailymeeting'>
                            <i className='fas fa-ellipsis-h'></i>
                            <h4>Daily Meeting</h4>
                            <ul>
                              <li>David alba (host)</li>
                              <li>26 participants </li>
                            </ul>
                            <div className='im'>
                              {' '}
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                            </div>
                            <span>1 hour</span>
                          </div>
                        </div>
                        <div className='col-md-4'>
                          <div className='dailymeeting'>
                            <i className='fas fa-ellipsis-h'></i>
                            <h4>Daily Meeting</h4>
                            <ul>
                              <li>David alba (host)</li>
                              <li>26 participants </li>
                            </ul>
                            <div className='im'>
                              {' '}
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                            </div>
                            <span>1 hour</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </react.Fragment>
  );
};

export default Home;
