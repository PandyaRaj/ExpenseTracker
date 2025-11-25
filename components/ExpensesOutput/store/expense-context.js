import { createContext, useReducer } from 'react'

// Dummy data
// Dummy data with mixed recent + older expenses
// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     description: 'Running Shoes',
//     amount: 59.99,
//     date: new Date(), // today
//   },
//   {
//     id: 'e2',
//     description: 'Grocery Shopping',
//     amount: 42.5,
//     date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
//   },
//   {
//     id: 'e3',
//     description: 'Movie Night',
//     amount: 18.0,
//     date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
//   },
//   {
//     id: 'e4',
//     description: 'Monthly Subscription',
//     amount: 12.99,
//     date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
//   },
//   {
//     id: 'e5',
//     description: 'Dinner with Friends',
//     amount: 80.0,
//     date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), // 25 days ago
//   },
//   {
//     id: 'e6',
//     description: 'New Jacket',
//     amount: 129.99,
//     date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000), // 40 days ago
//   },
//   {
//     id: 'e7',
//     description: 'Gym Membership',
//     amount: 45.0,
//     date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
//   },
// ]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
})

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id }, ...state]
    case 'SET':
      return action.payload.reverse()
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = { ...updatableExpense, ...action.payload.data }
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)

    default:
      return state
  }
}

function ExpensesContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expensesReducer, [])

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData })
  }
  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }
  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id, data: expenseData } })
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    setExpenses: setExpenses,
    updateExpense: updateExpense,
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider
