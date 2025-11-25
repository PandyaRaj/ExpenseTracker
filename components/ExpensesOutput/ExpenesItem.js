import { useNavigation } from '@react-navigation/native'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constansts/Styles'
import { getFormatDate } from '../../util/date'

function ExpenseItem({ id, description, amount, date }) {
  const navigation = useNavigation()

  function expensePressHandler() {
    navigation.navigate('ManageExpense', { expenseId: id })
  }

  return (
    <Pressable onPress={expensePressHandler} style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.expenseItem}>
        {/* Left Section */}
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {String(description || 'No Description')}
          </Text>
          <Text style={styles.textBase}>{String(getFormatDate(date) || '—')}</Text>
        </View>

        {/* Right Section */}
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${Number(amount || 0).toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray700,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
  },
  textBase: {
    color: 'white',
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  amountContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    color: GlobalStyles.colors.primary700,
    fontWeight: 'bold',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
})
