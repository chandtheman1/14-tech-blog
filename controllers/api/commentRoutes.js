const router = require("express").Router();
const { Blog, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    const commentsData = await Comment.findAll({
        include: {
            model: User,
            attributes: ["username"],
        }
    });

    res.json(commentsData);
});

router.post('/', async (req, res) => {
    const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        blog_id: req.body.blog_id,
        // add req.session.user_id
    });

    res.json(newComment);
});



module.exports = router;