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

export default LoginForm;