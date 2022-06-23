// import { getAllByLabelText } from '@testing-library/react';
import React, {useEffect,useRef } from 'react';
import {useLocation} from 'react-router-dom'
import soundfile from '../sound/alerm.mp3' 

function Player(){
    const location = useLocation();//location.state.videoId,timer
    const videoId = location.state.videoId
    const isFree = location.state.isFree
    const iframePlayer = useRef(null)
    const [playerWidth,setPlayerWidth]=React.useState(640)
    const [playerHeight,setPlayerHeight]=React.useState(360)
    

    const url = "https://www.youtube.com/embed/"+videoId+"?rel=0&enablejsapi=1&autoplay=1&mute=1&modestbranding=1&loop=1&playlist="+videoId;
    // const url = "https://www.youtube.com/embed/"+"J3U4omE7frE"+"?rel=0&autoplay=1&modestbranding=1&loop=1&playlist=J3U4omE7frE";

    const changePlayerSize = (x,y) =>{
        setPlayerWidth(x)
        setPlayerHeight(y)
    }
    const playerControl = (action,arg=null) => {
        iframePlayer.current.contentWindow.postMessage('{"event":"command", "func":"'+action+'", "args":'+arg+'}', '*');
    }
  
    return (
        <div>
            <h2>Player</h2>
            {!isFree && 
                <div>
                    <Timer secTimer={location.state.secTimer} playerControl={(action) => playerControl(action)}/>
                    <HidePlayerButton changePlayerSize ={(x,y)=>changePlayerSize(x,y)}/>
                </div>
                
            }
            
            <div>
                <iframe id = "player" ref={iframePlayer} type="text/html" width= {playerWidth} height={playerHeight}
                src={url}
                frameBorder="0">
            </iframe>
            </div>
        </div>
    )
}

const HidePlayerButton = (props) =>{
    const [isPlayerHidden,setIsPlayerHidden] = React.useState(false);
    const hidePlayer = () => {
        setIsPlayerHidden(true)
        props.changePlayerSize(1,1)  
    }
    const showPlayer = () => {
        setIsPlayerHidden(false)
        props.changePlayerSize(640,360)
    }
    return (
        <Button 
            value = {isPlayerHidden ? "showPlayer" : "hidePlayer"}
            onClick = {() => {isPlayerHidden ? showPlayer() : hidePlayer()}}
        />
    );
}

const Timer = (props) =>{
    const alerm = new Audio(soundfile)
    const secTimer = props.secTimer
    const [timerId,setTimerId] = React.useState(null)
    const [time,setTime] = React.useState(secTimer);
    const [isPlaying,setIsPlaying] = React.useState(false);
    useEffect(() => {
            startTimer();
    }, []);
    useEffect(() => {
        if(time===0){
            stopTimer()
            clearInterval(timerId)
            alerm.play()
            setTimeout(()=>{
                alerm.pause()
                alerm.currentTime=0
            },3000)
            setTime(secTimer)
        }
    }, [time]);
    const startTimer = () =>{
        if(time<=0){
            setTime(secTimer)
        }
        setIsPlaying(true)
        props.playerControl('playVideo')
        setTimerId(setInterval(() => {
            setTime(t => t - 1);
          }, 1000));
    }
    const stopTimer = () => {
        setIsPlaying(false)
        props.playerControl('pauseVideo')
        // playerControl('seekTo','[60,true]')
        clearInterval(timerId)
    }
    return (
        <div>
                <p>{Math.floor(time/60)} : {('00'+(time % 60)).slice(-2)}</p>
                <Button 
                    value = {isPlaying ? "stop" : "start"}
                    onClick = {() => {isPlaying ? stopTimer() : startTimer()}}
                />
            </div>
    );
}

const Button = (props) =>{
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>

    );
}
export default Player;