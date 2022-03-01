import react, { Component } from "react";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import './chathome.css'
import chat from "../../../img/download.png";  
class Chathome extends Component {
  state = {}

  render() {
    return (
      <react.Fragment>
<div className='lst'>
<Tabs defaultActiveKey="Direct" id="uncontrolled-tab-example">
                    <Tab eventKey="Direct" title="Direct">
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:1125</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:1315</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:775</span>
                      </div>
                 </Tab>
                    <Tab eventKey="Group" title="Group">
                 
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:175</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:195</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:135</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:215</span>
                      </div>
                     </Tab>
                      <Tab eventKey="Archive" title="Archive">
                 
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:5</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:85</span>
                      </div>
                      <div className='cont'>
                        
                        <img src={chat} alt='a' />
                        <span>09:95</span>
                      </div>
              </Tab>
                    </Tabs>
                  </div> 
                 
      </react.Fragment>
    );
  }
}
export default Chathome;
