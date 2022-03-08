import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',

  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="loginContainer">
        <form>
          <label htmlFor="email">
            User:
            <input
              name="email"
              type="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              name="password"
              type="password"
              data-testid="password-input"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>

          <button type="button">Enviar</button>
        </form>
      </div>
    );
  }
}

export default Login;
