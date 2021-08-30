import { useCallback, useRef, useState, useEffect } from 'react'
import Webcam from "react-webcam";

import imageBase from '../../image/photoBase.jpg'
import './basic.css'

const videoConstraints = {
  width: 600,
  height: 600,
  facingMode: "user"
};

let Basic = (props) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null)
  const [devices, setDevices] = useState([]);

  const capture = useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();

      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      let baseCanvas = new Image();
      let photoCamera = new Image();

      baseCanvas.src = imageBase
      photoCamera.src = imageSrc

      setTimeout(() => {
        ctx.drawImage(baseCanvas, 0, 0, 771, 900);
        ctx.drawImage(photoCamera, 135, 179, 499, 411);
      }, 1000);
    }, [webcamRef]
  );

  const handleDevices = useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]
  );

  return (
    <div className="basicContainer">
      <h1>Basic</h1>
      {
        devices.map((device, key) => (
          <div className="devicesContainer" key={key}>
            <Webcam
              height={600}
              width={600}
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ ...videoConstraints, deviceId: device.deviceId }}
            />
            {device.label || `Device ${key + 1}`}
          </div>

        ))
      }
      <button onClick={capture}>Capture photo</button>

      <canvas className="canvas" ref={canvasRef} width={800} height={1000}/>
    </div>
  )
}

export default Basic
