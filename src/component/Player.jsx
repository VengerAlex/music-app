import React, {useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying}) => {
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    })

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
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;

        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration
        })
    }
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value})
    }

    console.log(isPlaying)


    return (
        <div className='player'>
            <div className="time-conrol">
                <p>{getTimeHandler(songInfo.currentTime)}</p>
                <input
                    onChange={dragHandler}
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    type="range"
                />
                <p>{getTimeHandler(songInfo.duration)}</p>
            </div>
            <div className="play-conrol">
                <FontAwesomeIcon
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
                    className='skip-forward'
                    icon={faAngleRight}
                    size='2x'
                />
            </div>
            <audio
                onLoadedMetadata={timeUpdateHandler}
                onTimeUpdate={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;