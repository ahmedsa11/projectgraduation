import React, { useEffect,useRef} from "react";
import react from "react";
import { Hands } from "@mediapipe/hands"; 
import * as hands from "@mediapipe/hands"; 
import * as cam from "@mediapipe/camera_utils";
import io from 'socket.io-client';
const sio = io("http://54.87.224.114/");
sio.on('connect', () => {
  console.log('connected');
  
});
sio.on('disconnect', () => {
  console.log('disconnected');
});
sio.on("connect_error", () =>{
  console.log("error")
});
const SignToText = ({textsign,uservideo,signToText}) => {
    const canvasRef = useRef(null);
    const drawConnectors = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    var count = 0;
    var frames = [];
    var camera=null
    function onResults(results) {
      const videoWidth = uservideo.current.videoWidth;
      const videoHeight = uservideo.current.videoHeight;
      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // console.log(results); 
      // Set canvas width
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext("2d");
      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          count++;
          frames.push(landmarks);
          // console.log(count);
          if (count === 10) {
              sio.emit("stream_sign", {'landmarks':frames});
              console.log(frames.length);
              count = 0;
              frames=[];
          }
          drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
        }
      }
      canvasCtx.restore();
    }
    
  useEffect(() => {
    if(signToText){
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      },
    });
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    hands.onResults(onResults);
      // eslint-disable-next-line 
      camera = new cam.Camera(uservideo.current, { 
        onFrame: async () => {
          await hands.send({ image: uservideo.current});
        }
      });
      camera.start();
     // recive data from the server
sio.on("stream_sign", (pyload)=>{
    console.log('receive done ', pyload["text"]);
    console.log(pyload["text"])
  if (textsign.current) {

    textsign.current.textContent = pyload["text"];
  }
  });
}
   // eslint-disable-next-line
  }, [signToText]);

  return (
    <react.Fragment>
       <canvas id='canvas' ref={canvasRef} className="canvas"></canvas>
    </react.Fragment>
  );
};
export default SignToText;
