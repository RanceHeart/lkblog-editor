const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    tags: { type: [String], required: true },
    content: { type: String, required: true },
    readTime: { type: String, required: true },
}, {
    timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
