const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {

    const blogData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
    });

    const blogs = blogData.map(blog => {
        blog.get({ plain: true })
    })

    res.render('homepage', {
        blogData
    });
    // res.json(blogData);
});

module.exports = router;