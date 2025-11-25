import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'

import ExpensesContextProvider from './components/ExpensesOutput/store/expense-context' // ✅ Import context provider
import { GlobalStyles } from './constansts/Styles'
import AllExpenses from './screens/AllExpenses'
import ManageExpense from './screens/ManageExpense'
import RecentExpenses from './screens/RecentExpenses'
import IconButton from './UI/IconButton'
const Stack = createNativeStackNavigator()
const BottomTabs = createBottomTabNavigator()

function App() {
  function ExpenseOverview() {
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({ tintColor }) => (
            <IconButton
              icon='add'
              size={24}
              color={tintColor}
              onPress={() => navigation.navigate('ManageExpense')}
            />
          ),
        })}
      >
        <BottomTabs.Screen
          name='RecentExpenses'
          component={RecentExpenses}
          options={{
            title: 'Recent Expenses',
            tabBarLabel: 'Recent',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='hourglass' size={size} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name='AllExpenses'
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All',
            tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />,
          }}
        />
      </BottomTabs.Navigator>
    )
  }
  return (
    <>
      <StatusBar style='auto' />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name='ExpenseOverview'
              component={ExpenseOverview}
            />
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  )
}

export default App
