import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonIsDisable: false,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { email, password, buttonIsDisable } = this.state;
    const MAX_CHARACTER = 6;
    if (password.length >= MAX_CHARACTER) {
      console.log('é isso');
    }
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

          <button
            disabled={ buttonIsDisable }
            onSubmit={ this.handleSubmit }
            type="button"
          >
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
