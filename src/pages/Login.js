import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { saveUserEmail } from '../actions';

const MAX_CHARACTER = 6;

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonIsEnabled: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { email, password } = this.state;
    if (prevState.email !== email || prevState.password !== password) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        buttonIsEnabled:
          validateEmail(email) && password.length >= MAX_CHARACTER,
      });
    }
  }

  handleChange = ({ target }) => {
    // console.log('depois', validated);
    this.setState({
      [target.name]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { saveEmail, history } = this.props;
    saveEmail(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonIsEnabled } = this.state;

    return (
      <div className="loginContainer">
        <form onSubmit={ this.handleSubmit }>
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

          <button disabled={ !buttonIsEnabled } type="submit">
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => {
    dispatch(saveUserEmail(email));
  },
});

export default connect(null, mapDispatchToProps)(Login);
