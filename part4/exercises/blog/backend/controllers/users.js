const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 });
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, likes: 1 });
    response.json(user)
})

usersRouter.post('/',  async (request, response) => {
    const body = request.body;
    console.log(body.username)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash
    });

    const savedUser = await user.save()

    response.json(savedUser)
});

module.exports = usersRouter;