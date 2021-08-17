import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({setCurrentSong,songs, setSongInfo,currentSong, isPlaying, setIsPlaying, audioRef, songInfo}) => {

    const getTimeHandler = (time) => {
        return (
            Math.floor(time / 60) + ':'
            + ('0' + Math.floor(time % 60)).slice(-2)
        )
    }
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play()
            setIsPlaying(!isPlaying);
        }

    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }
    const skipTractHandler = direction => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if(direction === 'skip-forward'){
            setCurrentSong(songs[currentIndex + 1])
        }else{
            setCurrentSong(songs[currentIndex - 1])
        }
    }

    return (
        <div className='player'>
            <div className="time-conrol">
                <p>{getTimeHandler(songInfo.currentTime)}</p>
                <input
                    onChange={dragHandler}
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    type="range"
                />
                <p>{getTimeHandler(songInfo.duration)}</p>
            </div>
            <div className="play-conrol">
                <FontAwesomeIcon
                    onClick={() => skipTractHandler('skip-back')}
                    className='skip-back'
                    size='2x'
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className='play'
                    size='4x' icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipTractHandler('skip-forward')}
                    className='skip-forward'
                    icon={faAngleRight}
                    size='2x'
                />
            </div>
        </div>
    );
};

export default Player;