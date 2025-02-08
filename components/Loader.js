import React from 'react';
import { ActivityIndicator, View, StyleSheet, Modal } from 'react-native';

const Loader = ({ visible }) => {
  if (!visible) return null; // Don't render anything if visible is false

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});
