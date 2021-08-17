import React, {useRef, useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";
import {playAudio} from "../util";

const Player = ({setSongs, setCurrentSong,songs, setSongInfo,currentSong, isPlaying, setIsPlaying, audioRef, songInfo}) => {

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
            setCurrentSong(songs[(currentIndex + 1)  % songs.length])
        }else if(direction === 'skip-back'){
            if((currentIndex - 1) % songs.length === -1){
                setCurrentSong(songs[songs.length - 1])
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1)  % songs.length])
        }
        playAudio(isPlaying, audioRef);
    }

    useEffect(() => {
        const newSongs = songs.map(song => {
            if(song.id === currentSong.id){
                return{
                    ...song, active: true
                }
            }else{
                return {
                    ...song,
                    active: false
                }
            }
        })
        setSongs(newSongs);
    }, [currentSong])

    return (
        <div className='player'>
            <div className="time-conrol">
                <p>{getTimeHandler(songInfo.currentTime)}</p>
                <div className="track">
                    <input
                        onChange={dragHandler}
                        min={0}
                        max={songInfo.duration}
                        value={songInfo.currentTime}
                        type="range"
                    />
                    <div className="animate-track"></div>
                </div>
                <p>{songInfo.duration ? (getTimeHandler(songInfo.duration)) : '0:0'}</p>
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