import React, {useRef} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong}) => {
    const audioRef = useRef(null);

    const playSongHandler = () => {
        console.log(audioRef.current)
    }

    return (
        <div className='player'>
            <div className="time-conrol">
                <p>Start Time</p>
                <input type="range"/>
                <p>End Time</p>
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
                    size='4x'
                    icon={faPlay}
                />
                <FontAwesomeIcon
                    className='skip-forward'
                    icon={faAngleRight}
                    size='2x'
                />
            </div>
            <audio
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;