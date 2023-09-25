const router = require('express').Router();
const MusicInfoModel = require('./musicInfo.model');
const {get} = require("axios");
const MusicFolderModel = require("./musicFolder.model");

const platformTypeConst = {
    YOUTUBE: "YOUTUBE",
    BILIBILI: "BILIBILI"
}

// CRUD for the music info
router.route('/').post(async (req, res) => {
    const { link, platformType, folderId } = req.body;

    // Check folder exist
    const musicFolder = await MusicFolderModel.findById(folderId);
    if (!musicFolder) return res.status(404).json({ message: 'MusicFolder not found, cannot add new music info' });

    let savedMusicInfo;

    if (platformType === platformTypeConst.YOUTUBE) {
        const videoId = link.split('v=')[1].split('&')[0];

        // Check if video ID already exists
        try {
            const existingMusicInfo = await MusicInfoModel.findOne({ videoId: videoId });
            if (existingMusicInfo) {
                console.log(`Video ID ${videoId} Exist in the database`);
                console.log(existingMusicInfo);
                savedMusicInfo = existingMusicInfo;
            }
        } catch (err) {
            return res.status(500).json({ message: 'Error checking existing music info.', error: err.toString() });
        }

        if (!savedMusicInfo) {
            const apiKey = process.env.YOUTUBE_API_KEY;
            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

            try {
                const response = await get(apiUrl);
                if (response.data.items && response.data.items.length > 0) {
                    const snippet = response.data.items[0].snippet;

                    const newMusicInfo = new MusicInfoModel({
                        videoId: videoId,
                        title: snippet.title,
                        author: snippet.channelTitle,
                        platform: platformType,
                        description: snippet.description,
                        publishedAt: snippet.publishedAt
                    });

                    savedMusicInfo = await newMusicInfo.save();
                    console.log(savedMusicInfo);

                } else {
                    return res.status(400).json('No video details found.');
                }
            } catch (error) {
                return res.status(500).json({ message: 'Error fetching video details:', error: error.toString() });
            }
        }
    } else {
        return res.status(400).json({ message: 'Invalid platform type.' });
    }

    // Ensure the musicInfo _id exists in the musicFolder.musicSeries
    if (savedMusicInfo && !musicFolder.musicSeries.includes(savedMusicInfo._id)) {
        musicFolder.musicSeries.push(savedMusicInfo._id);
        await musicFolder.save();
    }

    return res.json(savedMusicInfo);
});

router.route('/:id').get(async (req, res) => {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ message: 'Music Info ID is required.' });
    }

    // Fetch music info based on ID
    try {
        const musicInfo = await MusicInfoModel.findById(id);
        if (!musicInfo) {
            return res.status(404).json({ message: `No music info found for ID: ${id}` });
        }
        return res.status(200).json(musicInfo);
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching music info.', error: err.toString() });
    }
});

router.route('/:id').delete(async (req, res) => {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
        return res.status(400).json({ message: 'Music Info ID is required.' });
    }

    // Delete music info based on ID
    try {
        const musicInfo = await MusicInfoModel.findByIdAndRemove(id);
        if (!musicInfo) {
            return res.status(404).json({ message: `No music info found for ID: ${id}` });
        }
        return res.status(200).json({ message: `Music info with ID: ${id} was successfully deleted.` });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting music info.', error: err.toString() });
    }
});

module.exports = router;