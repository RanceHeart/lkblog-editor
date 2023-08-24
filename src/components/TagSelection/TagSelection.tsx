import { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Importing an arrow icon for demonstration
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing an arrow icon for demonstration

const tags = [
  {name: 'TouHouTag', src: '/public/tags/TouHouTag.png'},
  {name: 'TravelTag', src: '/public/tags/TravelTag.png'},
  {name: 'BookTag', src: '/public/tags/BookTag.png'},
  {name: 'CameraTag', src: '/public/tags/PhotoTag.png'},
  {name: 'CookingTag', src: '/public/tags/CookTag.png'}
];

const TagSelection: React.FC = () => {
  const [topTagIndex, setTopTagIndex] = useState(0);

  const rotateTags = (direction: number) => {
    const newIndex = (topTagIndex + direction) % tags.length;
    setTopTagIndex(newIndex >= 0 ? newIndex : tags.length + newIndex);
  };

  return (
      <div style={{ position: 'relative', height: '250px', perspective: '1200px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden' }}>
          {tags.map((tag, index) => {
            const rotation = 120 * (index - topTagIndex);
            return (
                <div
                    key={tag.name}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '18%',
                      transform: `rotate(${rotation}deg) translateY(-150px)`,
                      transformOrigin: 'center bottom',
                      opacity: Math.abs(rotation) < 180 ? 1 : 0,
                      transition: 'transform 0.3s, opacity 0.3s',
                    }}
                >
                  <img
                      src={tag.src}
                      alt={tag.name}
                      style={{ width: '200px' }}
                  />
                  <IconButton
                      size="small"
                      style={{ position: 'absolute', right: 0, top: 0 }}
                      onClick={() => console.log(tag.name)}
                  >
                    {/* Icon here */}
                  </IconButton>
                </div>
            );
          })}
          <IconButton
              size="large"
              style={{ position: 'absolute', top: '50%', left: '00%', transform: 'translateY(-50%)', zIndex: 10 }}
              onClick={() => rotateTags(-1)} // Rotate left
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
              size="large"
              style={{ position: 'absolute', top: '50%', right: '00%', transform: 'translateY(-50%)', zIndex: 10 }}
              onClick={() => rotateTags(1)} // Rotate right
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
  );
};

export default TagSelection;
