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
        return blog.dataValues
    })

    res.render('homepage', {
        blogs
    });

});

module.exports = router;