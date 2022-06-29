import react, { useEffect, useState } from "react";
import "./history.css";
import { useHistory } from "react-router";
import socket from "../socket";
const Dailymeeting=()=>{
  const tempuser = localStorage.getItem("user");
  const user = JSON.parse(tempuser);

  const [meets,setMeets]=useState([]);
  let history=useHistory()
  function reJoin(id,typeMeet) {
    
    history.push(`/room${typeMeet}/${id}`);
  }
  useEffect(()=>{
    socket.emit("get-rooms-user", {mobile:user.mobile});
    socket.on("get-rooms-user", ({userRooms})=>{
      console.log("asdad");
      userRooms.slice(-3).forEach(roomId => {
        socket.emit('get-all-users', { roomId });
         });
         
      console.log(userRooms);
    });
    socket.on('get-all-users', ({users,roomId,typeMeet}) => {
      setMeets(prev=>[...prev,{
        users:users.slice(-3),
        typeMeet,
        roomId,
        roomName:roomId.split("+")[1]|| "Unnamed"
         }]);
       
       console.log(roomId.split("+")[1]);
       console.log(roomId.split("+"));
    }); 
    // eslint-disable-next-line
  },[])

    return (
      <react.Fragment>
        {meets.map((meet) => (
          <div key={meet.roomId} className="dailymeeting">
            <i className="fas fa-times"></i>
            <h4>{meet.roomName}</h4>
       
              {meet.users.map((user) => {
                return (
                  <react.Fragment>
                         <ul>
                  <li key={user.mobile}>
                 {user.name}
                  </li>
                  </ul>
                    <div className="im" >
                       <img src={user.image} alt="a" />
                     </div>
                   
                     </react.Fragment>
                );
              })}
             {/* <span>{meets.time}</span>  */}
             <div className="rejoin" onClick={()=>reJoin(meet.roomId,meet.typeMeet)}>rejoin</div>
          </div>
        ))}
      </react.Fragment>
    );
  }
export default Dailymeeting;
