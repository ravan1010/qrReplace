import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

export default function App() {

  const [qr,setQr] = useState("");

  useEffect(()=>{

    QRCode.toDataURL(
      "upi://pay?pa=suhasnayaj-1@oksbi"
    ).then(setQr);

  },[]);


  const shareImage = async () => {

    const res = await fetch(qr);
    const blob = await res.blob();

    const file = new File([blob], "upi-qr.png", {
      type: "image/png"
    });

    if (navigator.share) {

      await navigator.share({
        title: "Pay via UPI",
        text: "Scan and pay",
        files: [file]
      });

    } else {
      alert("Sharing not supported on this browser");
    }

  };

  return(

    <div style={{textAlign:"center"}}>

      <h2>Scan & Pay</h2>

      {qr && <img src={qr} alt="qr" width="200"/>}

      <br/><br/>
      <button onClick={shareImage}>
     Share QR 
      </button> 

    </div>

  );

}
