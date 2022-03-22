const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

export default (state = INITIAL_STATE, action) => {
  let newId;
  let filteredExpenses;
  let editedExpenses;
  let foundExpenseIndex;

  switch (action.type) {
  case 'ADD_EXPENSE':
    if (state.expenses.length === 0) {
      newId = 0;
    } else {
      newId = state.expenses[state.expenses.length - 1].id * 1 + 1;
    }
    return {
      ...state,
      expenses: [...state.expenses, { id: newId, ...action.payload }],
    };
  case 'DELETE_EXPENSE':
    filteredExpenses = state.expenses.filter(
      (item) => item.id !== action.payload,
    );
    return { ...state, expenses: filteredExpenses };
  case 'EDIT_EXPENSE':
    editedExpenses = [...state.expenses];
    foundExpenseIndex = editedExpenses.findIndex((item) => (item.id === action.payload));
    editedExpenses[foundExpenseIndex].value = 666;
    return { ...state, expenses: editedExpenses };
  case 'UPDATE_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};
