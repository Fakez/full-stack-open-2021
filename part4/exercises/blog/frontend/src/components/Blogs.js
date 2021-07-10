const Blogs = ({user, userBlogs, handleLogout}) => {
    return(
      <div>
        <h2>blogs</h2>
        {user.name} (id: {user.id}) logged in.
        <button onClick={() => handleLogout()}>logout</button>
        <h3>user's blogs:</h3>
        {userBlogs ? userBlogs.map((blog, index) => <p key={index}>{blog.title} {blog.author}</p>) : null}
      </div>
    );
}

export default Blogs;