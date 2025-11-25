import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constansts/Styles'
import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>
  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses}></ExpensesList>
  }
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod}></ExpensesSummary>
      <ExpensesList expenses={expenses}></ExpensesList>
    </View>
  )
}
export default ExpensesOutput
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
})
