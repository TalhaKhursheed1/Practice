import React, { useRef, useState } from 'react';
import { View, Text, Dimensions, FlatList, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { datesData } from '../../constants'; // Assuming this contains the array you shared earlier
import LinearGradient from 'react-native-linear-gradient';

const android = Platform.OS === 'android';
const { width, height } = Dimensions.get('window');

export default function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / width);
        setCurrentIndex(index);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.imgUrl} style={styles.image} />
            <Text style={styles.name}>{`${item.name} ${item.lastName}, ${item.age}`}</Text>
            <Text style={styles.location}>{`${item.city}, ${item.country}`}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
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

            {/* Custom Carousel */}
            <View style={styles.carouselContainer}>
                <Text style={styles.carouselTitle}>Find your love</Text>
                <FlatList
                    ref={flatListRef}
                    data={datesData}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    onScroll={handleScroll}
                    snapToInterval={width} // Ensures snapping to each card
                    decelerationRate="fast" // Smooth scrolling
                    bounces={false} // Prevents bouncing
                />
                {/* Pagination Dots */}
                <View style={styles.pagination}>
                    {datesData.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 20,
        padding: 10,
    },
    profileContainer: {
        width: 40,
        height: 40,
        borderRadius: 25,
        top: 5,

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
        textAlign: 'center',
        color: '#FFF',
        top: 5,

    },
    carouselContainer: {
        flex: 1,
        paddingBottom: 16,
    },
    carouselTitle: {
        fontSize: 24,
        fontWeight: '600',
        marginHorizontal: 16,
        marginBottom: 10,
    },
    card: {
        width: width, // Full screen width for each card
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'white',
    },
    image: {
        width: width * 0.8,
        height: 300,
        borderRadius: 12,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 16,
        color: 'gray',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: 'black',
    },
    inactiveDot: {
        backgroundColor: '#d3d3d3',
    },
});
