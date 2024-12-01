//import libraries
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

// create a component
const Loader = (): React.JSX.Element => {
  return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default React.memo(Loader);
