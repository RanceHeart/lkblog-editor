import {Box} from "@mui/system";
import {Chip, IconButton, TextField, Typography} from "@mui/material";
import TagIcon from "@mui/icons-material/Tag.js";
import {useState} from "react";

const TagInput = () => {
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    return (
        <Box mt={2} display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" alignItems="center">
                <IconButton color="primary" onClick={() => {
                    if (tagInput && !tags.includes(tagInput)) {
                        setTags([...tags, tagInput]);
                        setTagInput('');
                    }
                }} sx={{ml: 2}}>
                    <TagIcon/>
                </IconButton>
                <TextField
                    value={tagInput}
                    onChange={event => {
                        setTagInput(event.target.value)
                    }}
                    placeholder="Enter a tag"
                    variant="outlined"
                    size="small"
                />
            </Box>
            <Typography variant="h6" sx={{mt: 2}}>Tags:</Typography>
            {tags.map((tag, index) => (
                <Box key={index} component="span" ml={1} mt={1}>
                    <Chip label={tag} onDelete={() => {
                        setTags(tags.filter((tagItem, tagIndex) => tagIndex !== index));
                    }}/>
                </Box>
            ))}
        </Box>
    );
}

export default TagInput