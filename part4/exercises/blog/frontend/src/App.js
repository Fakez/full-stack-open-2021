import {useState, useEffect} from 'react'

import loginService from './services/login'
import userService from './services/user'
import blogService from './services/blog'

const LoginForm = ({username, password, handleLogin, handleFormFieldChange}) => {
  return (
    <div>
      <h2>log in to app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type='text' defaultValue={username} name='username' onChange={handleFormFieldChange} />
        </div>
        <div>
          password
          <input type='text' defaultValue={password} name='password' onChange={handleFormFieldChange} />
        </div>
        <button type='sumit'>Login</button>
      </form>
    </div>
  );
}

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
        <button type='sumit'>Login</button>
      </form>
        </div>
  )
}

const Message = ({messageType, messageText}) => {
  let style = {color:'green'};
  if (messageType == 'error') {
    style = {color:'red'};
  }

  return (
    <div style={style}>
      {messageText}
    </div>
  )
}


function App() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState()
  const [username, setUsername] = useState('jamil');
  const [password, setPassword] = useState('12');
  const [messageType, setMessageType] = useState(null)
  const [messageText, setMessageText] = useState(null)

  useEffect(() => {
    const userLogin = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
    if (userLogin) {
      setUser(userLogin);
      blogService.setToken(userLogin.token);

      const getBlogs = async (userLogin) => {
      const userData = await userService.getUserById(userLogin.id);
        setUserBlogs(userData.blogs);
      }

      getBlogs(userLogin);
    }
  }, []);
  
  const handleFormFieldChange = (e) => {
    e.target.name === 'username' ? 
    setUsername(e.target.value) : 
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await loginService.login({username: username, password: password});
      const userData = await userService.getUserById(userLogin.id);
      setUser(userLogin);
      blogService.setToken(userLogin.token);
      setUserBlogs(userData.blogs);
      setUsername ('');
      setPassword ('');

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userLogin));

    } catch (exception) {
      console.log('wrong creds or', exception);

      setMessageText('Wrong credentials')
      setMessageType('error')

      setTimeout(() => {
        setMessageText(null)
        setMessageType(null)
      }, 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
    setUserBlogs(null);
  }

  const handleBlogCreation = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const newObject = {
      'title': data.get('title'), 
      'author': data.get('author'),
      'url': data.get('url')
    }
    const newBlog = await blogService.createBlog(newObject);

    setUserBlogs(userBlogs.concat(newBlog));

    setMessageText(`new blog ${newBlog.title} by ${newBlog.author} has been added`);
    setMessageType('success')

    setTimeout(() => {
        setMessageText(null)
        setMessageType(null)
      }, 2000)
  }

  return (
    <div>
      <Message messageType={messageType} messageText={messageText} />
      {user 
        ? <>
            <Blogs user={user} userBlogs={userBlogs} handleLogout={handleLogout} />
            <BlogCreator handleBlogCreation={handleBlogCreation} />
          </>
        : <>
            <LoginForm username={username} password={password} handleLogin={handleLogin} handleFormFieldChange={handleFormFieldChange} />
          </>
      }
    </div>
  );
}

export default App;
