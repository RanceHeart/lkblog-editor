import  {FC} from 'react';
import './VideoContainer.css';

const VIDEO_WIDTH = 1920;
const VIDEO_HEIGHT = 1080;

const videoIds = [
    "ibMKmdiHMe4",
    "rMqvFX-5kf4",
    "oklreyQHr1s",
    "f_qyF8kMSJk",
    "V6emBufK-2Y",
    "lvocUrrZqTc",
    "JJtBtX7WhQ8",
    "RZGgQ-YfO4o",
    "WehjsHom5z0",
    "FxmYKJT4xBc"
];

interface VideoContainerProps {
    id: string;
}

export const VideoContainer: FC<VideoContainerProps> = ({ id }) => {
    console.log("Get ID: " + id)
    return <div className="video-container">
        <iframe
            width={VIDEO_WIDTH}
            height={VIDEO_HEIGHT}
            src={`https://www.youtube.com/embed/${id}?autoplay=1&controls=1&mute=0&loop=1&modestbranding=1&showinfo=0&start=50&enablejsapi=1&&widgetid=3`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
    </div>;
};
