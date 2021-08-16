import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause} from "@fortawesome/free-solid-svg-icons";

const Song = ({currentSong}) => {
    return (
        <div>
            <div className='song-container'>
                <img
                    src={currentSong.cover}
                    alt={currentSong.artist}/>
                <h2>{currentSong.name}</h2>
                <h3>{currentSong.artist}</h3>
            </div>
        </div>

    );
};

export default Song;

