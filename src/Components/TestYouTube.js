import React from 'react';
import YouTube from 'react-youtube';

function TestYouTube() {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    return <YouTube videoId="" opts={opts} />; // Use a known working video ID
}

export default TestYouTube;