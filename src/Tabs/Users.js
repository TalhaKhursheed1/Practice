import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(''); // State to hold UserId
    const navigation = useNavigation();

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const storedUserId = await AsyncStorage.getItem('UserId');
        const email = await AsyncStorage.getItem('Email');
        setUserId(storedUserId); // Set UserId in state

        firestore()
            .collection('users')
            .where('email', '!=', email)
            .get()
            .then(res => {
                if (!res.empty) {
                    const userList = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setUsers(userList);
                } else {
                    console.log('No users found.');
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const renderUser = ({ item }) => (
        <TouchableOpacity
            style={styles.userCard}
            onPress={() => {
                navigation.navigate('ChatScreen', { data: item, id: userId }); // Pass userId from state
            }}
        >
            <Image source={require('../assets/Images/profileIcon.png')} style={styles.userImage} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name || 'No Name'}</Text>
                <Text style={styles.userEmail}>{item.email}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* <LinearGradient colors={['#6D6D6D', '#4B4B4B']} style={styles.header}>
        <Text style={styles.headerTitle}>Users</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </LinearGradient> */}
            <LinearGradient colors={['#FFCC70', '#C850C0']}>
                <View style={styles.header}>

                    <View style={styles.profileContainer}>
                        <Image
                            source={require('../assets/Images/profileIcon.png')} style={styles.profileImage} />
                    </View>
                    <Text style={styles.title}>Source 64</Text>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            {/* Add notification bell icon here */}
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>


            <FlatList
                data={users}
                keyExtractor={item => item.id}
                renderItem={renderUser}
                contentContainerStyle={styles.content}
                ListEmptyComponent={<Text style={styles.infoText}>No users available.</Text>}
            />
        </View>
    );
};

export default Users;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 20,
        padding:10,
    },
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        top:5,
        
        backgroundColor: 'rgba(245, 239, 239, 0.97)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 20,
        height: 22,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign:'center',
        color:'#FFF',
        top:5,

    },
    iconContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 8,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 10,
    },
    addButtonText: {
        fontSize: 14,
        color: '#2196F3',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    userCard: {
        width: Dimensions.get('window').width - 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
        borderWidth: 0.5,
    },
    userImage: {
        width: 20,
        height: 22,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    userEmail: {
        fontSize: 14,
        color: '#555',
    },
    infoText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
});
