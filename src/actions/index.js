export const saveUserEmail = (userEmail) => ({
  type: 'SAVE_USER_EMAIL',
  payload: userEmail,
});

export const addExpense = (expense) => async (dispatch) => {
  await fetch('https://economia.awesomeapi.com.br/json/all')
    .then((res) => res.json())
    .then((json) => {
      const completeExpense = { ...expense, exchangeRates: json };

      dispatch({
        type: 'ADD_EXPENSE',
        payload: completeExpense,
      });
    });
};

export const deleteExpense = (expenseId) => ({
  type: 'DELETE_EXPENSE',
  payload: expenseId,
});

export const editExpense = (expenseId) => ({
  type: 'EDIT_EXPENSE',
  payload: expenseId,
});

export const updateWallet = (wallet) => ({
  type: 'UPDATE_WALLET',
  payload: wallet,
});
