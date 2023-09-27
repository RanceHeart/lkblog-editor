// models/MusicInfo.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const musicInfoSchema = new Schema({
    videoId: { type: String, required: true, unique: true },  // Unique YouTube video ID
    title: { type: String, required: true },
    author: { type: String, required: true },
    platform: { type: String, required: true },
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'MusicFolder', required: true },
    description: { type: String },
    publishedAt: { type: Date },  // Date when the video was published
}, {
    timestamps: true,  // This will add createdAt and updatedAt fields
});

const MusicInfo= mongoose.model('MusicInfo', musicInfoSchema);

module.exports = MusicInfo;
