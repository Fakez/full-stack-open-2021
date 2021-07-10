import {useState, useEffect, useRef } from 'react'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import BlogCreator from './components/BlogCreator'
import Blogs from './components/Blogs'

import loginService from './services/login'
import userService from './services/user'
import blogService from './services/blog'



function App() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState()
  const [username, setUsername] = useState('jamil');
  const [password, setPassword] = useState('123');
  const [messageType, setMessageType] = useState(null);
  const [messageText, setMessageText] = useState(null);
  const blogFormRef = useRef();
  const loginFormRef = useRef();

  useEffect(() => {
    const userLogin = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
    if (userLogin) {
      setUser(userLogin);
      blogService.setToken(userLogin.token);

      const getBlogs = async (userLogin) => {
      const userData = await userService.getUserById(userLogin.id);
        setUserBlogs(userData.blogs.sort((a, b) => b.likes - a.likes));
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
      setUserBlogs(userData.blogs.sort((a, b) => b.likes - a.likes));
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
      'url': data.get('url'),
      'likes': 0
    }
    const newBlog = await blogService.createBlog(newObject);

    setUserBlogs(userBlogs.concat(newBlog));

    setMessageText(`new blog ${newBlog.title} by ${newBlog.author} has been added`);
    setMessageType('success')
    blogFormRef.current.toggleVisibility();
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
            <Togglable buttonLabel='create blog' ref={blogFormRef}>
              <BlogCreator handleBlogCreation={handleBlogCreation} />
            </Togglable>
          </>
        : <>
            <Togglable buttonLabel='LOGIN' ref={loginFormRef}>
              <LoginForm username={username} password={password} handleLogin={handleLogin} handleFormFieldChange={handleFormFieldChange} />
            </Togglable>
          </>
      }
    </div>
  );
}

export default App;
