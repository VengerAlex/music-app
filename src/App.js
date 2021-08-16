import {useState} from "react";
import data from './utils';

import './styles/app.scss';
import Player from "./component/Player";
import Song from "./component/Song";


const App = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[3]);

    return (
        <>
            <Song
                currentSong={currentSong}/>
            <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
            />
        </>
    )
}


export default App;
