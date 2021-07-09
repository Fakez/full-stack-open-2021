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

const Blogs = ({user, userBlogs}) => {
  return(
    <div>
      <h2>blogs</h2>
      {user.name} (id: {user.id}) logged in.
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

  // useEffect(async () => {
  //   const getUserBlogs = async () => {
  //     const userResponse = await userService.getUserById(user.id);
  //     setUserBlogs(userResponse.blogs);
  //   }
  //   user && getUserBlogs();
  // }, [user])
  
  const handleFormFieldChange = (e) => {
    e.target.name === 'username' ? 
    setUsername(e.target.value) : 
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({username: username, password: password});
      const userData = await userService.getUserById(user.id);
      setUser(user);
      setUserBlogs(userData.blogs);

      username = '';
      password = '';
    } catch (exception) {
      console.log('wrong creds');
      //setErrorMessage('Wrong credentials')
      //setTimeout(() => {
        //setErrorMessage(null)
      //}, 5000)
    }
  }

  return (
    <div>
      {user 
        ? <Blogs user={user} userBlogs={userBlogs} />
        : <LoginForm username={username} password={password} handleLogin={handleLogin} handleFormFieldChange={handleFormFieldChange} />
      }
    </div>
  );
}

export default App;
