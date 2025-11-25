import { FlatList } from 'react-native'
import ExpenesItem from './ExpenesItem'

function renderItem(itemData) {
  return <ExpenesItem {...itemData.item} />
}

function ExpensesList({ expenses }) {
  return <FlatList data={expenses} renderItem={renderItem} keyExtractor={(item) => item.id} />
}

export default ExpensesList
