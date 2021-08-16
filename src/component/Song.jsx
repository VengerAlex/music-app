import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const openLibraryHandler = () => {
    console.log('+')
}


const Song = ({currentSong}) => {
    return (
        <div>
            <div className='library-menu' onClick={openLibraryHandler}>
                  <FontAwesomeIcon
                      icon={faMusic}
                  />  Library
            </div>
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

