import { Button, StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../constansts/Styles'

function ErrorOverlay({ message, onConfirm }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, styles.text]}>An Error Occurred!</Text>
      <Text style={styles.text}>{message}</Text>

      <Button title='Okay' onPress={onConfirm} color='white' />
    </View>
  )
}

export default ErrorOverlay

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.gray500,
    color: 'white',
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
})
