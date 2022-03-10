import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const defaultForm = {
  value: 0,
  method: 'dinheiro',
  category: 'alimentacao',
  description: '',
};

class Wallet extends React.Component {
  state = {
    currenciesNames: [],
    currenciesData: [],
    form: { ...defaultForm },
  };

  async componentDidMount() {
    await fetch('https://economia.awesomeapi.com.br/json/all')
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          currenciesNames: Object.keys(json),
          currenciesData: Object.values(json),
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
    // const { form } = this.state;
    // console.log(form);
  };

  render() {
    const { currenciesNames, form } = this.state;
    const { email } = this.props;

    return (
      <>
        <header>
          <span data-testid="email-field">{ email }</span>
          <span data-testid="total-field"> 0 </span>
          <span data-testid="header-currency-field"> BRL </span>
        </header>
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              name="value"
              type="number"
              onChange={ this.handleChange }
              value={ form.value }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              aria-label="currency"
              onChange={ this.handleChange }
              name="currency"
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
              name="method"
              value={ form.method }
              onChange={ this.handleChange }
            >
              <option value="dinheiro">Dinheiro</option>
              <option value="credito">Cartão de Crédito</option>
              <option value="debito">Cartão de Débito</option>
            </select>
          </label>
          <label htmlFor="category">
            Categoria:
            <select
              data-testid="tag-input"
              aria-label="category"
              name="category"
              value={ form.category }
              onChange={ this.handleChange }
            >
              <option value="alimentacao">Alimentação</option>
              <option value="lazer">Lazer</option>
              <option value="trabalho">Trabalho</option>
              <option value="transporte">Transporte</option>
              <option value="saude">Saúde</option>
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
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar / Excluir </th>
            </tr>
            <tr>
              <th>Teste</th>
              <th>Teste2</th>
              <th>{}</th>
              <th>{}</th>
              <th>{}</th>
              <th>{}</th>
              <th>{}</th>
              <th>{}</th>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ email: state.user.email });

export default connect(mapStateToProps)(Wallet);
