import { StyleSheet, Text, TextInput, View } from 'react-native'
import { GlobalStyles } from '../../constansts/Styles'

function Input({ label, invalid, textInputConfig, style }) {
  const inputStyles = [styles.input]

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline)
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary50,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    borderWidth: 1,
    backgroundColor: GlobalStyles.colors.primary100,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
})
