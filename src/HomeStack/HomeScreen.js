import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Users from '../Tabs/Users';
import Setting from '../Tabs/Setting';
import ChatScreen from '../ChatScreen';
import Home from '../Tabs/Home';


const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('Users');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Users />;
      case 'Users':
        return <Home />;
      case 'Settings':
        return <Setting />;
        case 'Chat':
          return <ChatScreen />;
      default:
        return <Users />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderTabContent()}</View>

      {/* Custom Bottom Tabs */}
      <View style={styles.tabBar}>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Users' && styles.activeTab]}
          onPress={() => setActiveTab('Users')}
        >
          <Image
            source={require('../assets/Images/home.png')} // Replace with your Home icon path
            style={[styles.icon, activeTab === 'Users' && styles.activeIcon]}
          />
          <Text style={[styles.tabText, activeTab === 'Users' && styles.activeTabText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Home' && styles.activeTab]}
          onPress={() => setActiveTab('Home')}
        >
          <Image
            source={require('../assets/Images/users.png')} // Replace with your Home icon path
            style={[styles.icon, activeTab === 'Home' && styles.activeIcon]}
          />
          <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>Users</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Chat' && styles.activeTab]}
          onPress={() => setActiveTab('Chat')}
        >
          <Image
            source={require('../assets/Images/chat.png')} // Replace with your Home icon path
            style={[styles.icon, activeTab === 'Chat' && styles.activeIcon]}
          />
          <Text style={[styles.tabText, activeTab === 'Chat' && styles.activeTabText]}>Chat</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Settings' && styles.activeTab]}
          onPress={() => setActiveTab('Settings')}
        >
          <Image
            source={require('../assets/Images/profileIcon.png')} // Replace with your Home icon path
            // Replace with your User/Settings icon path
            style={[styles.icon, activeTab === 'Settings' && styles.activeIcon]}
          />
          <Text style={[styles.tabText, activeTab === 'Settings' && styles.activeTabText]}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',

  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#444444', // Medium Grey (Color 35)
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 22,
    tintColor: '#CCCCCC',
  },
  activeIcon: {
    tintColor: '#2196F3', // Blue (Color 27)
  },
  tabText: {
    color: '#CCCCCC',
    fontSize: 14,
    marginTop: 5,
  },
  activeTabText: {
    color: '#2196F3', // Blue (Color 27)
    fontWeight: 'bold',
  },
});
