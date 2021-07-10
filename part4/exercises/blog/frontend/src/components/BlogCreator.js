const BlogCreator = ({handleBlogCreation}) => {
    return (
      <div>
        <h2>create new blog</h2>
        <form onSubmit={handleBlogCreation}>
          <div>
            title: 
            <input type='text' name='title' defaultValue='k' />
          </div>
          <div>
            author: 
            <input type='text' name='author' defaultValue='k' />
          </div>
          <div>
            url: 
            <input type='text' name='url' defaultValue='k' />
          </div>
          <button type='sumit'>CREATE</button>
        </form>
          </div>
    )
}

export default BlogCreator;