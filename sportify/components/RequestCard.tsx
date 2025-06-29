import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type RequestCardProps = {
  requestId: number;
  username: string;
  onAccept: (requestId: number) => void;
  onReject: (requestId: number) => void;
};

const RequestCard = ({ requestId, username, onAccept, onReject }: RequestCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.username}>{username}</Text>
      <View style={styles.buttonsContainer}>
        <Pressable style={[styles.button, styles.accept]} onPress={() => onAccept(requestId)}>
          <Text style={styles.buttonText}>Accept</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.reject]} onPress={() => onReject(requestId)}>
          <Text style={styles.buttonText}>Reject</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0B2233',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  accept: {
    backgroundColor: '#4CAF50',
  },
  reject: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
