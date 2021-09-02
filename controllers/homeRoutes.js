const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    const blogData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });

    const blogs = blogData.map(blog => blog.get({plain: true}));

    res.render('homepage', {
        blogs, 
        loggedIn: req.session.loggedIn
    });

});

router.get("/blog/:id", withAuth, async (req, res) => {
    const blogData = await Blog.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                attributes: [
                    "comment_text",
                    "blog_id",
                    "user_id",
                ],
                include: {
                    model: User,
                    attributes: ["username"],
                }
            }
        ]
    });

    if (!blogData) {
        res.json({message: "This blog does not exist"});
    }

    const blog = blogData.get({ plain: true});

    res.render('blog', {
        blog,
        loggedIn: true,
    });


});


router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    } 
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;