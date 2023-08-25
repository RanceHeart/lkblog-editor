import { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'; // Importing an arrow icon for demonstration
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importing an arrow icon for demonstration

const tags = [
  {name: 'Touhou', src: '/public/tags/TouHouTag.png'},
  {name: 'Travel', src: '/public/tags/TravelTag.png'},
  {name: 'Book', src: '/public/tags/BookTag.png'},
  {name: 'Camera', src: '/public/tags/PhotoTag.png'},
  {name: 'Cooking', src: '/public/tags/CookTag.png'}
];

const TagSelection: React.FC<{ onTagClick: (tagName: string) => void }> = ({ onTagClick }) => {
  const [topTagIndex, setTopTagIndex] = useState(0);

  const rotateTags = (direction: number) => {
    const newIndex = (topTagIndex + direction) % tags.length;
    setTopTagIndex(newIndex >= 0 ? newIndex : tags.length + newIndex);
  };

  return (
      <div style={{ position: 'relative', height: '140px', perspective: '1000px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '55%', left: '40%', transform: 'translate(-50%, -50%)', width: '300px', height: '300px', borderRadius: '50%', overflow: 'hidden' }}>
          {tags.map((tag, index) => {
            const rotation = 72 * (index - topTagIndex); // Adjusted rotation degree for 5 tags (360/5 = 72)
            return (
                <div
                    key={tag.name}
                    style={{
                      position: 'absolute',
                      top: '70%',
                      left: '25%',
                      transform: `rotate(${rotation}deg) translateY(-150px)`, // Adjusted translateY for correct radius
                      transformOrigin: 'center bottom',
                      opacity: Math.abs(rotation) < 180 ? 1 : 0,
                      transition: 'transform 0.3s, opacity 0.3s',
                    }}
                >
                  <IconButton
                      onClick={() => {
                        console.log(tag.name)
                        onTagClick(tag.name)}}
                  >
                    <img
                        src={tag.src}
                        alt={tag.name}
                        style={{ width: '150px' }}
                    />
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
