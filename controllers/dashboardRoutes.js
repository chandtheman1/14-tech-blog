const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    const personalBlogdata = await Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: ["comment_text", "user_id"],
                include: {
                    model: User,
                    attributes: ["username"]
                }

            }
        ],
    });

    const personalBlogs = personalBlogdata.map(blog => {
        return blog.dataValues
    });
    
    res.render("dashboard", {
        personalBlogs,
        loggedIn: true,
    });
});

router.get('/edit/:id', withAuth, async (req, res) => {
    const editBlogData = await Blog.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Comment,
                attributes: ["comment_text", "user_id"],
                include: {
                    model: User,
                    attributes: ["username"]
                }
            },
        ],
    });

    const editBlog = editBlogData.dataValues;

    res.render("edit", {
        editBlog,
        loggedIn: true
    });
});

router.get('/create', withAuth, async (req, res) => {
    res.render("create", {
        loggedIn: true
    });
});


module.exports = router;