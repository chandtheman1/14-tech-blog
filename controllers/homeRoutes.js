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

    // const blogs = blogData.map(blog => {
    //     blog.get({ plain: true })
    // })

    const blogs = blogData.map(blog => {
        return blog.dataValues
    })

    res.render('homepage', {
        blogs
    });
    // console.log(blogData[0].dataValues);
    // console.log(blogs);
});

module.exports = router;