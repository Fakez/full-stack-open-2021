import {useState, useEffect} from 'react'

import loginService from './services/login'
import userService from './services/user'


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


function App() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState()
  const [username, setUsername] = useState('jamil');
  const [password, setPassword] = useState('12');

  useEffect(() => {
    const userLogin = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
    if (userLogin) {
      setUser(userLogin);
      
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
      setUserBlogs(userData.blogs);
      setUsername ('');
      setPassword ('');

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(userLogin));

    } catch (exception) {
      console.log('wrong creds or', exception);
      //setErrorMessage('Wrong credentials')
      //setTimeout(() => {
        //setErrorMessage(null)
      //}, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser');
    setUser(null);
    setUserBlogs(null);
  }

  return (
    <div>
      {user 
        ? <Blogs user={user} userBlogs={userBlogs} handleLogout={handleLogout} />
        : <LoginForm username={username} password={password} handleLogin={handleLogin} handleFormFieldChange={handleFormFieldChange} />
      }
    </div>
  );
}

export default App;
