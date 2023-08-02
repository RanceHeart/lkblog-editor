import { IconButton, Tooltip } from '@mui/material';
import { FaPen } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WritePostButton = () => {
  const [writeButtonScale, setWriteButtonScale] = useState(1);
  const navigate = useNavigate();

  return (
      <Tooltip title="write">
        <IconButton
            aria-label="write"
            size="large"
            color="primary"
            onClick={() => navigate('/create-new-posts')}
            onMouseEnter={() => setWriteButtonScale(1.05)}
            onMouseLeave={() => setWriteButtonScale(1)}
            onMouseDown={() => setWriteButtonScale(0.95)}
            onMouseUp={() => setWriteButtonScale(1)}
            sx={{transform: `scale(${writeButtonScale})`, transition: 'transform 0.3s ease'}}
        >
          <FaPen/>
        </IconButton>
      </Tooltip>
  );
};

export default WritePostButton;
