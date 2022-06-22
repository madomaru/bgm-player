import { getAllByLabelText } from '@testing-library/react';
import React, { startTransition, useEffect,useRef } from 'react';
import {useLocation} from 'react-router-dom'
import soundfile from '../sound/alerm.mp3' 

function Player(){
    const location = useLocation();//location.state.videoId,timer
    const videoId = location.state.videoId
    const isFree = location.state.isFree
    const alerm = new Audio(soundfile)
    const iframePlayer = useRef(null)
    const [playerWidth,setPlayerWidth]=React.useState(640)
    const [playerHeight,setPlayerHeight]=React.useState(360)
    const [timerId,setTimerId] = React.useState(null)
    const [time,setTime] = React.useState(location.state.secTimer);
    // const [time,setTime] = React.useState(3);
    const [isPlaying,setIsPlaying] = React.useState(false);
    const [isPlayerHidden,setIsPlayerHidden] = React.useState(false);

    const url = "https://www.youtube.com/embed/"+videoId+"?rel=0&enablejsapi=1&autoplay=1&mute=1&modestbranding=1&loop=1&playlist="+videoId;
    // const url = "https://www.youtube.com/embed/"+"J3U4omE7frE"+"?rel=0&autoplay=1&modestbranding=1&loop=1&playlist=J3U4omE7frE";

    useEffect(() => {
        if(!isFree){
            start();
        }
    }, []);
    useEffect(() => {
        if(time==0){
            stop()
            clearInterval(timerId)
            alerm.play()
            setTimeout(()=>{
                alerm.pause()
                alerm.currentTime=0
            },3000)
            setTime(location.state.secTimer)
        }
    }, [time]);


    
    const start = () =>{
        if(time<=0){
            setTime(location.state.secTimer)
        }
        setIsPlaying(true)
        playerControl('playVideo')
        setTimerId(setInterval(() => {
            setTime(t => t - 1);
          }, 1000));
    }
    const stop = () => {
        setIsPlaying(false)
        playerControl('pauseVideo')
        // playerControl('seekTo','[60,true]')
        clearInterval(timerId)
    }
    const playerControl = (action,arg=null) => {
        iframePlayer.current.contentWindow.postMessage('{"event":"command", "func":"'+action+'", "args":'+arg+'}', '*');
    }
    const hidePlayer = () => {
        setIsPlayerHidden(true)
        setPlayerWidth(1)
        setPlayerHeight(1)
    }
    const showPlayer = () => {
        setIsPlayerHidden(false)
        setPlayerWidth(640)
        setPlayerHeight(360)
    }
  
    return (
        <div>
            <h2>Player</h2>
            {!isFree && 
            <div>
                <p>{Math.floor(time/60)} : {('00'+(time % 60)).slice(-2)}</p>
                <Button 
                    value = {isPlaying ? "stop" : "start"}
                    onClick = {() => {isPlaying ? stop() : start()}}
                />
                <Button 
                    value = {isPlayerHidden ? "showPlayer" : "hidePlayer"}
                    onClick = {() => {isPlayerHidden ? showPlayer() : hidePlayer()}}
                />
            </div>
            }
            
            <div>
                <iframe ref={iframePlayer} type="text/html" width= {playerWidth} height={playerHeight}
                src={url}
                frameBorder="0">
            </iframe>
            </div>
        </div>
    )
}
const Button = (props) =>{
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>

    );
}
export default Player;