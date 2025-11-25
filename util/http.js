import axios from 'axios'

const BACKEND_URL = 'https://expense-cal-1988c-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
  try {
    const response = await axios.post(`${BACKEND_URL}/expenses.json`, {
      ...expenseData,
      date: expenseData.date instanceof Date ? expenseData.date.toISOString() : expenseData.date,
    })
    return response.data.name
  } catch (error) {
    console.log('❌ Error storing expense:', error.message)
    throw error
  }
}

export async function fetchExpense() {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`)
  const expenses = []

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    }
    expenses.push(expenseObj)
  }
  console.log(expenses)
  return expenses
}

export async function updateFunction(id, expenseData) {
  console.log('updating')

  const formattedData = {
    ...expenseData,
    date: expenseData.date instanceof Date ? expenseData.date.toISOString() : expenseData.date,
  }

  await axios.put(`${BACKEND_URL}/expenses/${id}.json`, formattedData)
}

export async function deleteExpense(id) {
  console.log('deleting', id)
  return await axios.delete(BACKEND_URL + '/expenses/' + id + '.json')
}
