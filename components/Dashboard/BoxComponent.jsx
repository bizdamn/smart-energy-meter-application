import React, { useState } from "react";


export default function BoxComponent({}) {

  return (
 <>
<div className="button-container">
  <div className="glass-btn blue-btn">
    {/*<div class="content">
h
    </div> */}
    <img src="https://i.postimg.cc/DwbWDQTx/facebook.png" alt="facebook" style={{width: '5.5em'}} />
  </div>
  <div className="glass-btn red-btn">
    {/* <div class="content">
e
    </div> */}
    <img src="https://i.postimg.cc/LstJ4Hhf/youtube.png" alt="youtube" style={{width: '6em'}} />
  </div>
  <div className="glass-btn amber-btn">
    {/* <div class="content">
y
    </div> */}
    <img src="https://i.postimg.cc/tgQ1H1Rp/soundcloud.png" alt="soundcloud" style={{width: '6em'}} />
  </div>
</div>

 </>
  );
}
