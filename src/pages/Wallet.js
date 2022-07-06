import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Wallet.css';
import { addExpense, deleteExpense, editExpense } from '../actions';
import image from '../image.jpg';

const defaultForm = {
  value: 0,
  method: 'Dinheiro',
  tag: 'Alimentação',
  currency: 'USD',
  description: '',
};

class Wallet extends React.Component {
  state = {
    currenciesNames: [],
    form: { ...defaultForm },
  };

  async componentDidMount() {
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          currenciesNames: Object.keys(json),
          form: { ...defaultForm, currency: Object.keys(json)[0] },
        });
      });
  }

  handleChange = ({ target }) => {
    this.setState((prev) => ({
      ...prev,
      form: { ...prev.form, [target.name]: target.value },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form } = this.state;
    const { dispatchAddExpense } = this.props;
    dispatchAddExpense(form);
    this.setState({ form: defaultForm });
  };

  checkCurrency = (currency) => {
    switch (currency) {
    case 'USD':
      return 'Dólar Comercial';
    case 'EUR':
      return 'Euro';
    default:
      return currency;
    }
  };

  renderExpenses = (expenses) => {
    const { dispatchDeleteExpense, dispatchEditExpense } = this.props;

    return expenses.map((item) => (
      <tr key={ item.id }>
        <td>{item.description}</td>
        <td>{item.tag}</td>
        <td>{item.method}</td>
        <td>{parseFloat(item.value).toFixed(2)}</td>
        <td>{this.checkCurrency(item.currency)}</td>
        <td>{parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)}</td>
        <td>
          {(item.exchangeRates[item.currency].ask * item.value).toFixed(2)}
        </td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => dispatchEditExpense(item.id) }
          >
            Editar
          </button>
          /
          <button
            data-testid="delete-btn"
            type="button"
            onClick={ () => dispatchDeleteExpense(item.id) }
          >
            Excluir
          </button>
        </td>
      </tr>
    ));
  };

  calculateTotal = (expenses) => expenses.reduce(
    (acc, item) => acc + item.exchangeRates[item.currency].ask * item.value,
    0,
  );

  render() {
    const { currenciesNames, form } = this.state;
    const { email, expenses } = this.props;
    return (
      <>
        <header className="Header">
          <span className="EmailField" data-testid="email-field">
            {email}
          </span>
          <span className="TotalField" data-testid="total-field">
            {this.calculateTotal(expenses)}
          </span>
          <span data-testid="header-currency-field"> BRL </span>
        </header>
        <form className="Form" onSubmit={ (e) => this.handleSubmit(e) }>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              type="number"
              onChange={ this.handleChange }
              value={ form.value }
              id="value"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              onChange={ this.handleChange }
              name="currency"
              value={ form.currency }
            >
              {currenciesNames
                .filter((item) => item !== 'USDT')
                .map((item) => (
                  <option data-testid={ item } key={ item } value={ item }>
                    {item}
                  </option>
                ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              aria-label="method"
              id="method"
              name="method"
              value={ form.method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              aria-label="tag"
              id="tag"
              name="tag"
              value={ form.tag }
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              name="description"
              type="text"
              value={ form.description }
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit">Adicionar despesa</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>{this.renderExpenses(expenses)}</tbody>
        </table>
        <div className="finance-image-background-container">
          <img
            alt="imagem sobre finanças"
            className="finance-image-background"
            src={ image }
          />
        </div>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  dispatchDeleteExpense: PropTypes.func.isRequired,
  dispatchEditExpense: PropTypes.func.isRequired,
  dispatchAddExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchAddExpense: (email) => {
    dispatch(addExpense(email));
  },
  dispatchDeleteExpense: (id) => {
    dispatch(deleteExpense(id));
  },
  dispatchEditExpense: (id) => {
    dispatch(editExpense(id));
  },
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
