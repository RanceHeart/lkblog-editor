const mongoose = require('mongoose');

const musicFolderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    musicSeriesInfo: { type: String, default: '' },
    musicInfo: { type: String, default: '' },
    musicSeries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MusicInfo' }] // Array of MusicInfo IDs
}, {
    timestamps: true,
});

const MusicFolder = mongoose.model('MusicFolder', musicFolderSchema);

module.exports = MusicFolder;
