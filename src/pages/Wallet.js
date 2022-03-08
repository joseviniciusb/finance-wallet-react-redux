import React from 'react';

class Wallet extends React.Component {
  state = {
    currencies: [],
  }

  componentDidMount() {
    fetch(
      'https://economia.awesomeapi.com.br/json/all',
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          currencies: json,

        });
      });
  }

  render() {
    const { currencies } = this.state;
    console.log(currencies);
    return (
      <>
        <header>
          <span data-testid="email-field" />
          <span data-testid="total-field"> 0 </span>
          <span data-testid="header-currency-field"> BRL </span>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input data-testid="value-input" name="value" type="number" />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select data-testid="currency-input" aria-label="currency" />
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select data-testid="method-input" aria-label="method" />
          </label>
          <label htmlFor="category">
            Categoria:
            <select data-testid="tag-input" aria-label="category" />
          </label>
          <label htmlFor="description">
            Descrição:
            <input data-testid="description-input" name="description" type="text" />
          </label>
          <button type="button">Adicionar despesa</button>
        </form>
      </>
    );
  }
}

export default Wallet;
