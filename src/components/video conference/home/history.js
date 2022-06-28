import react, { useEffect, useState } from "react";
import "./history.css";
import socket from "../socket";
const Dailymeeting=()=>{
  const tempuser = localStorage.getItem("user");
  const user = JSON.parse(tempuser);

  const [meets,setMeets]=useState([]);
  useEffect(()=>{
    socket.emit("get-rooms-user", {mobile:user.mobile});
    socket.on("get-rooms-user", ({userRooms})=>{
      console.log("asdad");
      userRooms.slice(-3).forEach(roomId => {
        socket.emit('get-all-users', { roomId });
         });
         
      console.log(userRooms);
    });
    socket.on('get-all-users', ({users,roomId}) => {
      console.log(roomId);
    
      setMeets(prev=>[...prev,{
        users:users.slice(-3),
        roomId
      }]);
       
       console.log(users.length);
    }); 
    // eslint-disable-next-line
  },[])

    return (
      <react.Fragment>
        {meets.map((meet) => (
          <div key={meet.roomId} className="dailymeeting">
            <i className="fas fa-times"></i>
            <h4>{meet.roomId}</h4>
            <ul>
              {meet.users.map((user) => {
                return (
                  <react.Fragment>
                  <li key={user.mobile}>
                 {user.name}
                  </li>
                    <div className="im">
                       <img src={user.image} alt="a" />
                     </div>
                     </react.Fragment>
                );
              })}
            </ul>
             <span>{meets.time}</span> 
          </div>
        ))}
      </react.Fragment>
    );
  }
export default Dailymeeting;
