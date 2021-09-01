const router = require("express").Router();
const { Blog, User, Comment } = require('../../models');

router.get('/', async (req, res) => {
    const usersData = await User.findAll({
        attributes: {
            exclude: ['password']
        }
    })

    res.json(usersData);
});

router.get('/:id', async (req, res) => {
    const userData = await User.findOne({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        },
        include: [
            {
                model: Blog,
                attributes: [
                    "id",
                    "title",
                    "content",
                    "user_id"
                ]
            },
            {
                model: Comment,
                attributes: [
                    "id",
                    "comment_text",
                ],
                include: {
                    model: Blog,
                    attributes: ["title"]
                },
            },
        ]
    });

    if (!userData) {
        res.json({message: "This user does not exist"});
    }

    res.json(userData);
});

router.post('/', async (req, res) => {
    const newUser = User.create({
        username: req.body.username,
        password: req.body.password
    });

    req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
    });

    res.json(newUser);
});

router.post('/login', async (req, res) => {

    try {

        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });
    
        if (!userData) {
            req
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
        }
    
        const validPassword = await userData.checkPassword(req.body.password);
    
        if (!validPassword) {
            req
              .status(400)
              .json({ message: 'Incorrect username or password, please try again' });
            return;
        }
    
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
    
            res.json({ message: 'You are logged in' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
    
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;