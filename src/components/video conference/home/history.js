import react, { Component } from "react";
import './history.css'
import chat from "../../../img/download.png";  

class Dailymeeting extends Component {
  state = {}

  render() {
    return (
      <react.Fragment>
     
                          <div className='dailymeeting'>
                            <i className='fas fa-ellipsis-h'></i>
                            <h4>Daily Meeting</h4>
                            <ul>
                              <li>David alba (host)</li>
                              <li>26 participants </li>
                            </ul>
                            <div className='im'>
                              
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                              <img src={chat} alt='a' />
                            </div>
                            <span>1 hour</span>
                          </div>
                       
      </react.Fragment>
    );
  }
}
export default Dailymeeting;
