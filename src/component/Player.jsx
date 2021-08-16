import React from 'react';

const Player = () => {
    return (
        <div className='player'>
           <div className="time-conrol">
               <p>Start Time</p>
               <input type="range"/>
               <p>End Time</p>
           </div>
            <div className="play-conrol">

            </div>
        </div>
    );
};

export default Player;