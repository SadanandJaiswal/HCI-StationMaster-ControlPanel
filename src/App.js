import React from 'react'
import { useEffect, useState } from "react";
// import "./1App.css";
import "./App.css";
import {upperMainLineLeds, downMainLineLeds, upperLoopLineLeds, downLoopLineLeds} from "./data";
// import { upMainLineLeds, downMainLineLeds } from "./data";
import beepSound from "./beepSound.mp3";

const App = () => {
  const [btnStack, setBtnStack] = useState([]);
  const [beepAudio, setBeepAudio] = useState(null);
  const [trackStatus, setTrackStatus] = useState([0, 0, 0, 0]);
  const [screenMsg, setScreenMsg] = useState("Everything is Ok");

  const initialLedsState = Array(39).fill(0);
  const [leds, setLeds] = useState(initialLedsState);

  const initialSignalState = Array(12).fill(0);
  const [signals, setSignals] = useState(initialSignalState);

  const [cancelBtn, setCancelBtn] = useState(false);

  const data = [
    {
      b1: 19,
      b2: 2,
      trackToSet: [6,7,8,9,10,4,0,1,2,3],
      ledsToOff: [6,7,8,4,9,10],
      crossToCheck: [4,5],
      signalChange: [0,2],
      signalToOff: [2]
    },
    {
      b1: 2,
      b2: 3,
      trackToSet: [6,7,8,9,10,11,12,13,14],
      ledsToOff: [6,7,8,9,10],
      crossToCheck: [],
      signalChange: [1,2,3],
      signalToOff: [1,2]
    }, 
    {
      b1: 1,
      b2: 6,
      finalSet: true,
      trackAlreadySet: [0,1,2],
      trackToSet: [5,16,17],
      ledsToOff: [],
      crossToCheck: [],
      signalChange: [4],
      signalToOff: []
    },
    {
      b1: 7,
      b2: 8,
      finalSet: true,
      greenSignal: true,
      trackAlreadySet: [16,17],
      trackToSet: [18],
      crossToCheck: [],
      checkAlreadyTrack: [5],
      
      ledsToOff: [0,1,2,3,5,16,17,18],
      signalChange: [0,4],

      ledsToOff2: [11,12,13,14,15,16,17,18],
      signalChange2: [3,4],
    },
    {
      b1: 4,
      b2: 6,
      finalSet: true,
      trackAlreadySet: [12,13],
      trackToSet: [15,16,17],
      ledsToOff: [],
      crossToCheck: [],
      signalChange: [3,4],
      signalToOff: []
    },
    {
      b1: 14,
      b2: 16,
      trackToSet: [26,27,28,29,30,31,32],
      ledsToOff: [30,31,32],
      crossToCheck: [],
      signalChange: [7,8,9],
      signalToOff: [8,9]
    }, 
    {
      b1: 13,
      b2: 11,
      finalSet: true,
      trackAlreadySet: [26,27],
      trackToSet: [25,24],
      ledsToOff: [],
      crossToCheck: [],
      signalChange: [6,7],
      signalToOff: []
    }, 
    {
      b1: 20,
      b2: 16,
      trackToSet: [30,31,32,34,35,36,37,38],
      ledsToOff: [30,31,32,34],
      crossToCheck: [33,34],
      signalChange: [8,9,10,11],
      signalToOff: [8,9]
    },
    {
      b1: 17,
      b2: 11,
      finalSet: true,
      trackAlreadySet: [35,36],
      trackToSet: [24,25,33],
      ledsToOff: [],
      crossToCheck: [],
      signalChange: [3,4],
      signalToOff: []
    },
    {
      b1: 9,
      b2: 10,
      finalSet: true,
      greenSignal: true,
      trackAlreadySet: [24,25],
      trackToSet: [21,22,23],
      crossToCheck: [],
      checkAlreadyTrack: [33],
      
      ledsToOff: [38, 37, 36, 35, 33, 25, 24, 23, 22, 21],
      signalChange: [5,6,10,11],

      ledsToOff2: [29, 28, 27, 26, 25, 24, 23, 22, 21],
      signalChange2: [5,6,7],
    },
    {
      b1: 100,
      b2: 91,
      trackToSetArray: [6,7,8,9,10]
    },
    {
      b1: 100,
      b2: 92,
      trackToSetArray: [21,22,23,24,25]
    },
    {
      b1: 100,
      b2: 93,
      trackToSetArray: [0,1,2,3]
    },
    {
      b1: 100,
      b2: 94,
      trackToSetArray: [11,12,13,14,15]
    },
    {
      b1: 100,
      b2: 95,
      trackToSetArray: [26,27,28,29]
    },
    {
      b1: 100,
      b2: 96,
      trackToSetArray: [35,36,37,38]
    },
    {
      b1: 100,
      b2: 97,
      trackToSetArray: [16,17,18]
    },
    {
      b1: 100,
      b2: 98,
      trackToSetArray: [30,31,32]
    },
  ];

  const handleCancelBtn = ()=>{
    setCancelBtn(!cancelBtn);
    handleButtonClick(100);
  }

  const trackConditionChange = ()=>{
    const [b1, b2] = btnStack;
    const trackData = data.find((entry) => (entry.b1 === b1 && entry.b2 === b2) || (entry.b1 === b2 && entry.b2 === b1));

    if(trackData){
      setLeds(leds =>{
        const updatedLeds = [...leds];
        trackData.trackToSetArray.forEach(index => {
          if(checkTrackStatus(trackData.trackToSetArray)===true){
            updatedLeds[index] = -1;
          }else{
            updatedLeds[index] = 0;
          }
        });
        return updatedLeds;
      })
    }else{
      setScreenMsg("No Command for such combination of buttons");
    } 
  }

  const playBeep = () => {
    if (beepAudio) {
      beepAudio.play();
      // setTimeout(() => {
      //   beepAudio.pause();
      // }, 200);
    }
  };

  const handleButtonClick = (btnId) => {
    if (btnId === -1) {
      playBeep();
      setScreenMsg(
        "having issue with the buttons, Can't proceed with the track setting"
      );
      setBtnStack([]);
    } else {
      // alert(btnId);
      setBtnStack((prevBtnStack) => [...prevBtnStack, btnId]); // Add btnId to btnStack
    }
  };

  const checkTrackStatus = (trackToSetArray) => {
    for (const led of trackToSetArray) { // Use a for...of loop for simpler iteration
        if (leds[led] !== 0) {
            return false; // Explicitly return false to break out
        }
    }
    return true; // Only reached if no element violates the condition
  };

  const changeLed = (ledArray,to) => {
    setLeds(leds => {
      const newLeds = [...leds];
      ledArray.forEach(ledIndex => {
        newLeds[ledIndex] = to;
      });
      return newLeds;
    });
  };

  const chnageSignal = (signalArray, to) => {
    setSignals(signals => {
      const newSignals = [...signals];
      signalArray.forEach(signal => {
        newSignals[signal] = to;
      });
      return newSignals;
    });
  };

  const handleTrainGoing = (ledsArray, signalsArray) => {
  const elements = document.getElementsByClassName(`ledSection`);
  let totalTimeouts = 0;

  chnageSignal(signalsArray, 2);

  ledsArray.forEach((value, index) => {
    const ledSectionLed = elements[value].getElementsByClassName('led');

    setTimeout(() => {
      for (let i = 0; i < ledSectionLed.length; i++) {
        ledSectionLed[i].classList.add("border50");
        ledSectionLed[i].classList.add("trainGoing");
      }
      setTimeout(() => {
        for (let i = 0; i < ledSectionLed.length; i++) {
          ledSectionLed[i].classList.remove("border50");
          ledSectionLed[i].classList.remove("trainGoing");
        }
      }, (index+1*1000));

    }, ((index+1)*500));

    setTimeout(() => {
      changeLed(ledsArray,0);
      chnageSignal(signalsArray, 0);
    }, (ledsArray.length*500 + 1000));





    // for (let i = 0; i < ledSectionLed.length; i++) {
    //   setTimeout(() => {
    //     ledSectionLed[i].classList.add("trainGoing");
    //   }, (index * ledSectionLed.length + i) * 500); // Calculate dynamic timeout
    //   setTimeout(() => {
    //     ledSectionLed[i].classList.remove("trainGoing");
    //   }, (index * ledSectionLed.length + i) * 700);
    // }
  });
};

  const changeTrackCrossStatus = () => {
    const [b1, b2] = btnStack;
    const trackData = data.find((entry) => (entry.b1 === b1 && entry.b2 === b2) || (entry.b1 === b2 && entry.b2 === b1));
    if(trackData){
      if(trackData?.finalSet === true){
        // alert("i'm here")
        if(checkTrackStatus(trackData.trackAlreadySet) === false){
          if(checkTrackStatus(trackData.trackToSet)){
            changeLed(trackData.trackToSet,2);
            if(trackData.greenSignal === true){
              if(checkTrackStatus(trackData.checkAlreadyTrack)===false){
                chnageSignal(trackData.signalChange, 1);
                // Train Leaving 
                handleTrainGoing(trackData.ledsToOff, trackData.signalChange);
                // setTimeout(() => {
                  // changeLed(trackData.ledsToOff,0);
                  // chnageSignal(trackData.signalChange, 0);
                // }, 5000);
              }else{
                chnageSignal(trackData.signalChange2, 1);
                // Train Leaving 
                handleTrainGoing(trackData.ledsToOff2, trackData.signalChange2);
                // setTimeout(() => {
                //   changeLed(trackData.ledsToOff2,0);
                //   chnageSignal(trackData.signalChange2, 0);
                // }, 5000);
              }

              
            }else{
              chnageSignal(trackData.signalChange, 1);
            }
            // alert('workign here')
          }else{
            setScreenMsg("track is already in use");
          }
        }else{
          setScreenMsg("cant set incomplete track");
        }
      }else{
        // const check = checkTrackStatus(trackData.trackToSet);
        // alert(check);
        if(checkTrackStatus(trackData.trackToSet)){
          if(checkTrackStatus(trackData.crossToCheck)){
            changeLed(trackData.trackToSet,1);
            chnageSignal(trackData.signalChange, 1);
            // Train Comming
            // handleTrainGoing(trackData.trackToSet, trackData.signalChange);
            setTimeout(() => {
              changeLed(trackData.ledsToOff,0);
              chnageSignal(trackData.signalToOff, 0);
            }, 5000);
          }else{
            setScreenMsg("cross is not working to set track");
          }
        }else{
          setScreenMsg("track is already in use");
        }
      }
    }else{
      setScreenMsg("not found in data array");
    }
  }

  useEffect(()=>{
    if(cancelBtn===true){
      setScreenMsg("Cancel Button Started");
    }else{
      setScreenMsg("Cancel Button Stopped");
    }
  },[cancelBtn])

  useEffect(()=>{
    if (btnStack.length === 2) {
      const [b1, b2] = btnStack;
      if(b1===100 || b2===100){
        trackConditionChange();
      }else{
        changeTrackCrossStatus();
      }
      playBeep();
      setBtnStack([]);
    }
  },[btnStack])

  useEffect(() => {
    const audio = new Audio(beepSound);
    setBeepAudio(audio);
    // const widthContainer = document.getElementsByClassName("container")[0].offsetWidth;
    // alert(widthContainer);
  }, []);

  useEffect(()=>{
    const elements = document.getElementsByClassName(`ledSection`);
    leds.forEach((value, index) => {
      const ledSectionLed = elements[index].getElementsByClassName('led');
      if(value === 1){
        for (let i = 0; i < ledSectionLed.length; i++) {
          ledSectionLed[i].classList.add("white");
        }
      }
      else if(value===2)
      {
        for (let i = 0; i < ledSectionLed.length; i++) {
          ledSectionLed[i].classList.add("purple");
        }
      }
      else if(value === -1){
        for (let i = 0; i < ledSectionLed.length; i++) {
          ledSectionLed[i].classList.add("cancel");
        }
      }
      else{
        for (let i = 0; i < ledSectionLed.length; i++) {
          ledSectionLed[i].classList.remove("white");
          ledSectionLed[i].classList.remove("purple");
          ledSectionLed[i].classList.remove("cancel");
        }
      }
    });
  },[leds])

  useEffect(()=>{
    const elements = document.getElementsByClassName('signal');

      signals.forEach((value, index) => {
        if (value === 0) {
          elements[index].getElementsByClassName('color')[0].classList.add('red');
          elements[index].getElementsByClassName('color')[1].classList.remove('yellow');
          elements[index].getElementsByClassName('color')[2].classList.remove('green');
        } else if (value === 1) {
          elements[index].getElementsByClassName('color')[1].classList.add('yellow');
          elements[index].getElementsByClassName('color')[0].classList.remove('red');
          elements[index].getElementsByClassName('color')[2].classList.remove('green');
        } else if (value === 2) {
          // console.log(elements[index])
          elements[index].getElementsByClassName('color')[2].classList.add('green');
          elements[index].getElementsByClassName('color')[0].classList.remove('red');
          elements[index].getElementsByClassName('color')[1].classList.remove('yellow');
        }
      });
  },[signals]);

  useEffect(()=>{
    setTimeout(() => {
      setScreenMsg("Everything is Ok");
    }, 3000);
  },[screenMsg]);

  return (
    <div className='body'>
      <center>
        <div className="container">
            <div className="displayScreenContainer">
              <div className="displayScreen">{`${screenMsg}`}</div>
            </div>
            <div className="shuntBtnContainer">
              <div className="btn"></div>
            </div>

            <div className="shuntBtnContainer">
              <div className="btn" onClick={() => handleButtonClick(19)}></div>
            </div>

            <div className="track loop-line" style={{marginLeft:"8%"}}>
                <div className="signalContainer">
                  <div className="signalContainerInnerDiv">
                    <div className="signal mL-75" style={{marginLeft:"74%"}}>
                      <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                    </div>
                  </div>
                </div>
              <div className="ledContainer">
                {upperLoopLineLeds.map((ledSec)=>{
                    return(
                      <div className="ledSection" style={{ width: ledSec.width, backgroundColor: ledSec.bgColor }}>
                        {ledSec.leds.map(led => {
                          if(led===0){
                            return (<div className="led"></div>)
                          }else{
                            return (
                              <div
                                onClick={() => handleButtonClick(led.id)}
                                className={`btn ${led.bg}`}
                                // style={{ marginLeft: "79%" }}
                              ></div>)
                          }
                        })}
                      </div>
                    )
                  })}
              </div>
            </div>
            <div className=" crossContainer" style={{width: "45%", marginLeft:"9%"}}>
              <div className="cross leftCross ledSection" style={{backgroundColor:"red", width: "100px", gap:"8px", paddingRight:"20px"}}>
                <div className="led"></div>
                <div className="led"></div>
              </div>
              <div className="cross rightCross ledSection" style={{backgroundColor:"yellow", paddingLeft:"20px", width:"135px", gap:"15px", marginRight:"-22px"}}>
                <div className="led"></div>
                <div className="led"></div>
              </div>
            </div>
            <div className="track main-line">
              <div className="signalContainer">
                <div className="mainSignalInnerDiv">
                  <div className="signal">
                      <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "12%" }}>
                      <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "44%" }}>
                      <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "23.7%" }}>
                      <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>
                </div>
              </div>
              <div className="ledContainer">
                {upperMainLineLeds.map((ledSec)=>{
                  return(
                    <div className="ledSection" style={{ width: ledSec.width, backgroundColor: ledSec.bgColor }}>
                      {ledSec.leds.map(led => {
                          if(led===0){
                            return (<div className="led"></div>)
                          }else{
                            return (
                              <div
                                onClick={() => handleButtonClick(led.id)}
                                className={`btn ${led.bg}`}
                                // style={{ marginLeft: "79%" }}
                              ></div>)
                          }
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className=" crossContainer" style={{width: "55%", padding: "15px", marginLeft:"8%"}}>
                <div className="cross rightCross ledSection" style={{backgroundColor:"yellow", paddingRight:"18px", width:"130px", gap:"12px", marginRight:"-22px"}}>
                  <div className="led"></div>
                  <div className="led" style={{marginRight:"0"}}></div>
                </div>
                <div className="cross leftCross ledSection" style={{backgroundColor:"red", width: "100px", gap:"8px", paddingLeft:"20px"}}>
                    <div className="led"></div>
                  <div className="led"></div>
                </div>
            </div>
            <div className="track main-line">
              <div className="ledContainer">
                {downMainLineLeds.map((ledSec)=>{
                    return(
                      <div className="ledSection" style={{ width: ledSec.width, backgroundColor: ledSec.bgColor }}>
                        {ledSec.leds.map(led => {
                          if(led===0){
                            return (<div className="led"></div>)
                          }else{
                            return (
                              <div
                                onClick={() => handleButtonClick(led.id)}
                                className={`btn ${led.bg}`}
                                // style={{ marginLeft: "79%" }}
                              ></div>)
                          }
                        })}
                      </div>
                    )
                })}
              </div>
              <div className="signalContainer">
                <div className="mainSignalInnerDiv" style={{transform: "translateY(20%)"}}>
                  <div className="signal" style={{ marginLeft: "6%" }}>
                    <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "9.8%" }}>
                  <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "22.5%" }}>
                  <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "37.2%" }}>
                  <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>

                  <div className="signal" style={{ marginLeft: "5%" }}>
                  <div className="color redS black"></div>
                      <div className="color yellowS black"></div>
                      <div className="color greenS black"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="crossContainer" style={{width: "39%", marginLeft:"10.2%", paddingBottom:"5px"}}>
                <div className="cross rota ledSection" style={{backgroundColor:"yellow", width:"130px", gap:"7px"}}>
                  <div className="led"></div>
                  <div className="led" style={{marginRight:"35px"}}></div>
                </div>
                <div className="cross rota2 ledSection" style={{backgroundColor:"red", width: "93px", gap:"7px", paddingLeft:"20px"}}>
                    <div className="led"></div>
                    <div className="led"></div>
                </div>
            </div>
            <div className="track loop-line" style={{marginLeft:"10%", backgroundColor:"white"}}>
              <div className="ledContainer">
                  {downLoopLineLeds.map((ledSec)=>{
                      return(
                        <div className="ledSection" style={{ width: ledSec.width, backgroundColor: ledSec.bgColor }}>
                          {ledSec.leds.map(led => {
                            if(led===0){
                              return (<div className="led"></div>)
                            }else{
                              return (
                                <div
                                  onClick={() => handleButtonClick(led.id)}
                                  className={`btn ${led.bg}`}
                                  // style={{ marginLeft: "79%" }}
                                ></div>)
                            }
                          })}
                        </div>
                      )
                    })}
              </div>
              <div className="signalContainer " style={{marginTop:"5px"}}>
                <div className="signalContainerInnerDiv">
                  <div className="signal " style={{ marginLeft: "15%" }}>
                  <div className="color redS black"></div>
                    <div className="color yellowS black"></div>
                    <div className="color greenS black"></div>
                  </div>
                  <div className="signal " style={{ marginLeft: "40%" }}>
                  <div className="color redS black"></div>
                    <div className="color yellowS black"></div>
                    <div className="color greenS black"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shuntBtnContainer">
              <div className="btn" onClick={() => handleButtonClick(20)}></div>
            </div>

            <div className="shuntBtnContainer">
              <div className="btn"></div>
            </div>

            <div className="pointBtnContainer">
              <div>
                <div className="btn blue" onClick={() => handleButtonClick(91)}></div>
                <div className="btn blue" onClick={() => handleButtonClick(92)}></div>
              </div>
              <div>
                <div className="btn blue" onClick={() => handleButtonClick(93)}></div>
                <div className="btn blue" onClick={() => handleButtonClick(94)}></div>
                <div className="cancelBtnContainer">
                  <div className="btn black" onClick={handleCancelBtn}></div>
                </div>
                <div className="btn blue" onClick={() => handleButtonClick(95)}></div>
                <div className="btn blue" onClick={() => handleButtonClick(96)}></div>
              </div>
              <div>
                <div className="btn blue" onClick={() => handleButtonClick(97)}></div>
                <div className="btn blue" onClick={() => handleButtonClick(98)}></div>
              </div>
            </div>

        </div>
      </center>
    </div>
  )
}

export default App
