import { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { ExpensesContext } from '../components/ExpensesOutput/store/expense-context'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { GlobalStyles } from '../constansts/Styles'
import ErrorOverlay from '../UI/ErrorOverlay'
import IconButton from '../UI/IconButton'
import LoadingOverlay from '../UI/LoadingOverlay'
import { deleteExpense, storeExpense, updateFunction } from '../util/http'

function ManageExpense({ route, navigation }) {
  const expenseCtx = useContext(ExpensesContext)
  const [error, setError] = useState()
  const [isFetching, setIsFetching] = useState(false)

  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const selectedExpense = expenseCtx.expenses?.find((expense) => expense.id === editedExpenseId)

  async function deleteExpenseHandler() {
    try {
      setIsFetching(true)
      await deleteExpense(editedExpenseId)
      expenseCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (error) {
      setError(`❌ Error deleting expense: ${error.message}`)
      setIsFetching(false)
    }
  }

  async function confirmHandler(expenseData) {
    setIsFetching(true)
    try {
      if (isEditing) {
        expenseCtx.updateExpense(editedExpenseId, expenseData)
        await updateFunction(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expenseCtx.addExpense({ ...expenseData, id })
      }
      navigation.goBack()
    } catch (error) {
      setError(`❌ Error saving expense: ${error.message}`)
      console.log('❌ Error updating/adding expense:', error.message)
      setIsFetching(false)
    }
  }

  function cancelHandler() {
    navigation.goBack()
  }

  function errorHandler() {
    setError(null)
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton icon='trash' size={36} color='red' onPress={deleteExpenseHandler} />
        </View>
      )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopColor: GlobalStyles.colors.primary200,
    borderTopWidth: 2,
    alignItems: 'center',
  },
})
