const router = require('express').Router();
const MusicInfoModel = require('./musicInfo.model');
const MusicFolderModel = require('./musicFolder.model');
const {get} = require("axios");

const platformTypeConst = {
    YOUTUBE: "YOUTUBE",
    BILIBILI: "BILIBILI"
}


router.route('/store-music-info').post(async (req, res) => {
    const { youtubeLink, platformType } = req.body;

    // Check for platformType
    if (platformType !== platformTypeConst.YOUTUBE) {
        return res.status(400).json({ message: 'Invalid platform type.' });
    }

    const videoId = youtubeLink.split('v=')[1].split('&')[0];

    // Check if video ID already exists
    try {
        const existingMusicInfo = await MusicInfoModel.findOne({ videoId: videoId });
        if (existingMusicInfo) {
            console.log(`Video ID ${videoId} Exist in the database`)
            return res.status(200).json(existingMusicInfo);
        }
    } catch (err) {
        return res.status(500).json({ message: 'Error checking existing music info.', error: err.toString() });
    }

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
                description: "",
                publishedAt: snippet.publishedAt
            });

            newMusicInfo.save()
                .then((savedMusicInfo) => res.json({ callId: savedMusicInfo._id }))
                .catch(err => res.status(400).json('Error saving music info: ' + err));

        } else {
            res.status(400).json('No video details found.');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching video details:', error: error.toString() });
    }
});

// CRUD for the music folder
router.post('/', async (req, res) => {
    try {
        const musicFolder = new MusicFolderModel(req.body);
        await musicFolder.save();
        res.status(201).json(musicFolder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all MusicFolders ids
router.get('/', async (req, res) => {
    try {
        const musicFolders = await MusicFolderModel.find({}, '_id'); // Only fetch the '_id' field
        const folderIds = musicFolders.map(folder => folder._id); // Extract the IDs into an array
        res.status(200).json(folderIds);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific MusicFolder by ID
router.get('/:id', async (req, res) => {
    try {
        const musicFolder = await MusicFolderModel.findById(req.params.id).populate('musicSeries');
        if (!musicFolder) return res.status(404).json({ message: 'MusicFolder not found' });
        res.status(200).json(musicFolder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a MusicFolder by ID
router.put('/:id', async (req, res) => {
    try {
        const musicFolder = await MusicFolderModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!musicFolder) return res.status(404).json({ message: 'MusicFolder not found' });
        res.json(musicFolder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a MusicFolder by ID
router.delete('/:id', async (req, res) => {
    try {
        const musicFolder = await MusicFolderModel.findByIdAndDelete(req.params.id);
        if (!musicFolder) return res.status(404).json({ message: 'MusicFolder not found' });
        res.json({ message: 'MusicFolder deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;