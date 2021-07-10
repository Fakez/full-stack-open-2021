import {useState, useEffect, useRef } from 'react'

import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
//import BlogCreator from './components/BlogCreator'
import Blogs from './components/Blogs'

import loginService from './services/login'
import userService from './services/user'
import blogService from './services/blog'



function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('jamil');
  const [password, setPassword] = useState('123');
  const [messageType, setMessageType] = useState(null);
  const [messageText, setMessageText] = useState(null);
  const loginFormRef = useRef();

  useEffect(() => {
    const userLogin = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
    if (userLogin) {
      setUser(userLogin);
      blogService.setToken(userLogin.token);
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
      setUser(userLogin);
      blogService.setToken(userLogin.token);

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
  }




  return (
    <div>
      <Message messageType={messageType} messageText={messageText} />
      {user 
        ? <>
            <Blogs user={user} handleLogout={handleLogout} />
            
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
