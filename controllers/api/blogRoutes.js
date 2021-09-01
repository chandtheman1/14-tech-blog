const router = require("express").Router();
const { Blog, User, Comment } = require('../../models');

router.get("/", async (req, res) => {
    const blogsData = await Blog.findAll({
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
        ],
    });


    const blogs = blogsData.map(blog => {
        return blog.dataValues
    });

    res.json(blogs);

});

router.get("/:id", async (req, res) => {
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

    const blog = blogData.dataValues;

    res.json(blog);


});

router.put("/:id", async (req, res) => {
    const newBlogData = await Blog.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            },
        },
    );

    res.json(newBlogData);
});

router.delete("/:id", async (req, res) => {
    const deleteBlogData = await Blog.destroy(
        {
            where: {
                id: req.params.id
            }
        },
    );
    
    res.json(deleteBlogData);
});


module.exports = router;