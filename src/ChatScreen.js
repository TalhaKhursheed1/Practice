/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import ChatHeader from '../components/chatHeader';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { data } = route.params;
  // Create a unique chatId using both user IDs (sorted to avoid duplication)
  const chatId = [route.params.id, route.params.data.userId].sort().join('_');

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const allMessages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          return {
            _id: doc.id,
            text: firebaseData.text || '',
            createdAt: firebaseData.createdAt ? firebaseData.createdAt.toDate() : new Date(),
            user: firebaseData.user,
          };
        });
        setMessages(allMessages);
      });

    return () => subscriber(); // Unsubscribe on cleanup
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: firestore.FieldValue.serverTimestamp(), // Use server timestamp
    };

    // Optimistic UI update
    setMessages(previousMessages => GiftedChat.append(previousMessages, { ...msg, createdAt: new Date() }));

    // Add the message to Firestore
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .add(myMsg)
      .catch(error => console.log('Error sending message: ', error));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader userName={data.name || 'Chat'}/>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
