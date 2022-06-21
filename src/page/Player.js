import { useEffect } from 'react';
import {useLocation} from 'react-router-dom'

function Player(){
    const location = useLocation();//location.state.videoId,timer
    const videoId = location.state.videoId
    const url = "https://www.youtube.com/embed/"+videoId+"?rel=0&autoplay=1&modestbranding=1&controls=0&loop=1&playlist="+videoId;
    // const url = "https://www.youtube.com/embed/"+"J3U4omE7frE"+"?rel=0&autoplay=1&modestbranding=1&loop=1&playlist=J3U4omE7frE";
    return (
        <div>
            <h2>Player</h2>
            <iframe id="player" type="text/html" width="640" height="360"
                src={url}
                frameborder="0">
            </iframe>
        </div>
    )
}

export default Player;