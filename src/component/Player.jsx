import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause} from "@fortawesome/free-solid-svg-icons";

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
    const skipTractHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);

        if(direction === 'skip-forward'){
            await setCurrentSong(songs[(currentIndex + 1)  % songs.length])
            activeLibraryHandler(songs[(currentIndex + 1)  % songs.length])
        }else if(direction === 'skip-back'){
            if((currentIndex - 1) % songs.length === -1){
                await setCurrentSong(songs[songs.length - 1])
                activeLibraryHandler(songs[songs.length - 1])
                if(isPlaying) audioRef.current.play()
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1)  % songs.length])
            activeLibraryHandler(songs[(currentIndex - 1)  % songs.length])
        }
        if(isPlaying) audioRef.current.play()
    }

    const trackAnim = {
        transform : `translateX(${songInfo.anumationsPercantage}%)`
    }

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map(song => {
            if(song.id === nextPrev.id){
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
    }

    return (
        <div className='player'>
            <div className="time-conrol">
                <p>{getTimeHandler(songInfo.currentTime)}</p>
                <div className="track"
                        style={{background:
                        `linear-gradient(to right, 
                        ${currentSong.color[0]},
                        ${currentSong.color[1]})`}} >
                    <input
                        onChange={dragHandler}
                        min={0}
                        max={songInfo.duration}
                        value={songInfo.currentTime}
                        type="range"
                    />
                    <div className="animate-track" style={trackAnim}></div>
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