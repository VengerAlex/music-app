import {useState, useRef} from "react";
import data from './utils';

import './styles/app.scss';
import Player from "./component/Player";
import Song from "./component/Song";
import Library from "./component/Library";
import Nav from "./component/Nav";

const App = (props) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[3]);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        anumationsPercantage: 0
    })
    const [libraryStatus, setLibraryStatus] = useState(false);

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        const roundedCurrent = Math.round(current);
        const roundedDuration = Math.round(duration);
        const animation = Math.round((roundedCurrent / roundedDuration) * 100)

        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration,
            anumationsPercantage: animation
        })
    }


    return (
        <>
            <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
            />
            <Song
                currentSong={currentSong}/>
            <Player
                setCurrentSong={setCurrentSong}
                songs={songs}
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                setSongs={setSongs}
            />
            <Library
                libraryStatus={libraryStatus}
                setSongs={setSongs}
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
            />
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </>
    )
}


export default App;
