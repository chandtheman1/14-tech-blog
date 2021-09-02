const router = require("express").Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    const commentsData = await Comment.findAll({
        include: {
            model: User,
            attributes: ["username"],
        }
    });

    res.json(commentsData);
});

router.post('/', withAuth, async (req, res) => {
    const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id
    });

    res.json(newComment);
});

router.delete('/:id', withAuth, async (req, res) => {
    const commentDelete = await Comment.destroy({
        where: {
            id: req.params.id
        }
    });

    if (!commentDelete) {
        res.json({message: "No comment found"});
        return
    }

    res.json(commentDelete);
});


module.exports = router;