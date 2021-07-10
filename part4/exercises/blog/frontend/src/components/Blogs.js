import {useEffect} from 'react'

import Togglable from './Togglable'

import blogService from '../services/blog'
import { useState } from 'react'

const BlogDetails = ({id}) => {
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
    <button onClick={toggleShow} style={buttonStyle}>{show ? 'hide' : 'show'}</button>
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
      </div> : ''}
    </>
  )
}

const Blogs = ({user, userBlogs, handleLogout}) => {

    return(
      <div>
        <h2>blogs</h2>
        {user.name} (id: {user.id}) logged in.
        <button onClick={() => handleLogout()}>logout</button>
        <h3>user's blogs:</h3>
        {userBlogs ? userBlogs.map((blog, index) => { return (
            <div key={index} style={{ border:'1px solid green'}}>
              <span>{blog.title} {blog.author}</span>
              <BlogDetails id={blog.id} />
            </div>
          );
        }) : null}
      </div>
    );
}

export default Blogs;