/*useRef - DOM Access & Persisting Values
Tasks:

Create videoRef with useRef(null)
Attach ref to <video> element
Use videoRef.current.play() / .pause() in handler
Fix render count - use useRef to persist value across renders without causing re-renders

Key concepts: DOM refs, persisting values, useRef doesn't trigger re-renders*/


import { useState, useRef } from 'react';

function VideoPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [count, setCount] = useState(0); // Unrelated counter

    // TODO: Create a ref for the video element
    const videoref = useRef(null)
    // BUG: This recreates the value on every render
    //let renderCount = 0;
    const renderCount = useRef(0);
    renderCount.current++;
    console.log('Renders:', renderCount); // Always shows 1!

    const handlePlayPause = () => {
        // TODO: Use ref to call video.play() or video.pause()
        // Don't use document.querySelector!
        if (isPlaying)
            videoref.current.pause();
        else
            videoref.current.play();
        setIsPlaying(!isPlaying);
    };

    const handleRestart = () => {
        // TODO: Reset video to start (currentTime = 0)
        videoref.current.currentTime = 0;
    };

    return (
        <div>
            {/* TODO: Attach ref to video element */}
            <video ref={videoref} width="300" src="https://www.w3schools.com/html/mov_bbb.mp4" />

            <div>
                <button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button onClick={handleRestart}>Restart</button>
                <button onClick={() => setCount(count + 1)}>
                    Unrelated Counter: {count}
                </button>
            </div>

            <p>Render count: {renderCount.current}</p>
        </div>
    );
}

export default VideoPlayer;