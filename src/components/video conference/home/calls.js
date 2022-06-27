import react from "react";
import "./calls.css";
import { v4 as uuid } from "uuid";
import { useHistory } from "react-router";
import logoutimg from '../../../img/logout.png'

const Calls=()=> {
  let history=useHistory()
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
    return (
      <react.Fragment>
        <div className="lst">
          <div className="container">
          <div className="row">
            <div className="col-sm-6">
          <div className="callaudio">
            <div className="overlay"></div>
            <i className="fas fa-phone-alt"onClick={clickJoinAudio}></i>
            {/* <span>Create Now</span> */}
            <div className="tit">New voice call</div>
            </div>
            </div>
            <div className="col-sm-6">
          <div className="callvideo"> 
          <div className="overlay"></div>
          <i className="fas fa-video" onClick={clickJoinVideo}></i>
          {/* <span>Create Now</span> */}
          <div className="tit">New video call</div>
          </div>
          </div>
          <div className="col-sm-6">
        <div className="logimg">
        <div className="overlay"></div>
            <img src={logoutimg} alt="a" onClick={logout}/> 
             {/* <span>Logout</span> */}
            <div className="tit">Logout</div>
            </div>
            </div>
            {/* <div className="col-sm-6">
        <div className="rejoin"> 
          <div className="overlay"></div>
          <i className="fas fa-repeat" ></i><span>Rejoin</span></div>
          </div> */}
          </div> </div>
          </div>
      
      </react.Fragment>
    );
}
export default Calls;
