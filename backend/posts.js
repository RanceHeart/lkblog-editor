const router = require('express').Router();
let Post = require('./post.model');

router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newPost = new Post(req.body);

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Post.findOne({ id: req.params.id })
        .then(post => {
            console.debug(post)
            return res.json(post)
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Post.findOneAndDelete({ id: req.params.id })
        .then(() => res.json('Post deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findOne({ id: req.params.id })
        .then(post => {
            post.title = req.body.title;
            post.image = req.body.image;
            post.tags = req.body.tags;
            post.content = req.body.content;
            post.readTime = req.body.readTime;

            post.save()
                .then(() => res.json('Post updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
