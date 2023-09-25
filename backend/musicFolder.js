const router = require('express').Router();
const MusicFolderModel = require('./musicFolder.model');


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

// Get all MusicFolder ids
router.get('/', async (req, res) => {
    try {
        const musicFolders = await MusicFolderModel.find({}, '_id'); // Only fetch the '_id' field
        const folderIds = musicFolders.map(folder => folder._id); // Extract the IDs into an array
        console.log("Get All response: " + folderIds)
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