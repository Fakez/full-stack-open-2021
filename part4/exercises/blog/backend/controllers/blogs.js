const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId', { name: 1, username: 1 });
  response.json(blogs);
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }

})

blogsRouter.post('/',  async (request, response, next) => {
  const body = request.body;

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if (body.userId) {
    userId = body.userId;
  } else {
    userId = decodedToken.id;
  }

  //const user = await User.findById(body.userId);
  const user = await User.findById(userId);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    //userId: user._id
    userId: userId,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save()
  response.json(savedBlog);
    
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id;
  const blog = await Blog.findById(request.params.id)

  if (blog.userId.toString() !== userId.toString()) {
    return response.status(401).json({ error: 'only owners can delete blogs' })
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog);
    })
    .catch(error => next(error))
})

module.exports = blogsRouter;