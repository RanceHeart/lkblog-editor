const router = require('express').Router();
const formData = require('express-form-data');
const Post = require('./post.model');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

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

router.route('/upload').post(formData.parse(), async (req, res) => {
  const values = Object.values(req.files);
  const uploadedFile = values[0];

  try {
    const result = await cloudinary.uploader.upload(uploadedFile.path, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    res.json({ default: result.url });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload' });
  }
});

module.exports = router;
