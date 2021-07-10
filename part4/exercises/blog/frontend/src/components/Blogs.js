import {useEffect, useRef} from 'react'

import Togglable from './Togglable'
import BlogCreator from '../components/BlogCreator'


import blogService from '../services/blog'
import userService from '../services/user'

import { useState } from 'react'

const BlogDetails = ({id, handleBlogDelete}) => {
  const [blogDetail, setBlogDetail] = useState()
  const [show, setShow] = useState(false);

  const buttonStyle = {
    color:'blue'
  }

  useEffect(() => {
    const getBlogDetails = async () => {
      const blog = await blogService.getBlog(id);
      blog && setBlogDetail(blog);
    }

    if (show && !blogDetail) {getBlogDetails();}
  }, [show]);

  const toggleShow = () => {
    setShow(!show);
  }

  const handleBlogLike = async (blogDetail) => {
    const updatedBlog = {
      title: blogDetail.title,
      author: blogDetail.author,
      url: blogDetail.url,
      likes: blogDetail.likes + 1,
    }

    const blog = await blogService.updateBlog(blogDetail.id, updatedBlog);
    blog && setBlogDetail(blog);
  }

  return (
    <> 
    <button onClick={() => toggleShow()} style={buttonStyle}>{show ? 'hide' : 'show'}</button>
    {blogDetail && show ?
      <div style={{display:'block'}}>
        <p>id: {blogDetail.id}</p>
        <p>title: {blogDetail.title}</p>
        <p>author: {blogDetail.author}</p>
        <p>url: {blogDetail.url}</p>
        <p>likes: 
          {blogDetail.likes} 
          <button onClick={() => handleBlogLike(blogDetail)} style={buttonStyle}>like</button>
        </p>
        <button onClick={() => handleBlogDelete(blogDetail.id)} style={buttonStyle}>delete</button>

      </div> : ''}
    </>
  )
}

const Blogs = ({user, handleLogout}) => {

  const [userBlogs, setUserBlogs] = useState();
  const blogFormRef = useRef();


  useEffect(() => {
      const getBlogs = async userId => {
        const userData = await userService.getUserById(userId);
        setUserBlogs(userData.blogs.sort((a, b) => b.likes - a.likes));
      }
      getBlogs(user.id);

  }, []);

  const handleBlogCreation = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newObject = {
      'title': data.get('title'), 
      'author': data.get('author'),
      'url': data.get('url'),
      'likes': 0
    }
    const newBlog = await blogService.createBlog(newObject);

    setUserBlogs(userBlogs.concat(newBlog));

    // setMessageText(`new blog ${newBlog.title} by ${newBlog.author} has been added`);
    // setMessageType('success')
    // blogFormRef.current.toggleVisibility();
    // setTimeout(() => {
    //     setMessageText(null)
    //     setMessageType(null)
    //   }, 2000)
  }

  const handleBlogDelete = async (blogId) => {
    console.log(blogId)
    console.log(window.localStorage.getItem('loggedBlogUser'))

    if (window.confirm(`Do you really want to delete blog id ${blogId}`)) {
      const deletedBlog = await blogService.deleteBlog(blogId);
      setUserBlogs(userBlogs.filter(blog => blog.id !== blogId));
    }
  }



    return(
      <div>
        <h2>blogs</h2>
        {user.name} (id: {user.id}) logged in.
        <button onClick={() => handleLogout()}>logout</button>
        <h3>user's blogs:</h3>
        {userBlogs ? [userBlogs.map((blog, index) => { return (
            <div key={index} style={{ border:'1px solid green'}}>
              <span>{blog.title} | {blog.author}</span>
              <BlogDetails id={blog.id} handleBlogDelete={handleBlogDelete} />
            </div>
            
          );}),
          <Togglable key='blog-creator-togglable' buttonLabel='create blog' ref={blogFormRef}>
            <BlogCreator handleBlogCreation={handleBlogCreation} />
          </Togglable>]
          : null}
      </div>
    );
}

export default Blogs;