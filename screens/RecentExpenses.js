import { useContext, useEffect, useState } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../components/ExpensesOutput/store/expense-context'
import ErrorOverlay from '../UI/ErrorOverlay'
import LoadingOverlay from '../UI/LoadingOverlay'
import { getDateMinusDays } from '../util/date'
import { fetchExpense } from '../util/http'

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext)
  const [error, setError] = useState()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    async function getExpenses() {
      try {
        setIsFetching(true)
        const expenses = await fetchExpense()
        expensesCtx.setExpenses(expenses)
      } catch (error) {
        setError(`❌ Error fetching expenses: ${error.message}`)
      } finally {
        setIsFetching(false)
      }
    }
    getExpenses()
  }, [])

  function errorHandler() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)
    const expenseDate = new Date(expense.date)
    return expenseDate >= date7DaysAgo && expenseDate <= today
  })

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='No expenses registered for the last 7 days.'
    />
  )
}

export default RecentExpenses
