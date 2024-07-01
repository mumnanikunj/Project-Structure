import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFill
  },
  stream: {
    flex: 2,
    width: 200,
    height: 200
  },
  buttons: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  }
});

export default styles;