import React from "react";
import {
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    Text,
    View,
    StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function DatesCard({ item, handleClick }) {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => handleClick(item)}>
                <Image
                    source={item.imgUrl}
                    style={styles.image}
                    resizeMode="cover"
                />
            </TouchableWithoutFeedback>

            <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.9)"]}
                style={styles.gradient}
                start={{ x: 0.5, y: 0.5 }}
                end={{ x: 0.5, y: 1 }}
            />

            <View style={styles.infoContainer}>
                <View style={styles.row}>
                    <Text style={styles.nameText}>
                        {item.name} {item.lastName},{" "}
                    </Text>
                    <Text style={styles.ageText}>{item.age}</Text>
                    {/* <CheckBadgeIcon size={25} color={"#3B82F6"} /> */}
                </View>

                <View style={styles.row}>
                    <Text style={styles.locationText}>{item.city}, </Text>
                    <Text style={styles.locationText}>{item.country}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    image: {
        width: width * 0.8,
        height: height * 0.75,
        borderRadius: 24,
    },
    gradient: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "100%",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    infoContainer: {
        position: "absolute",
        bottom: 10,
        justifyContent: "flex-start",
        width: "100%",
        paddingLeft: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    nameText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
    },
    ageText: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold",
        marginRight: 8,
    },
    locationText: {
        fontSize: 18,
        color: "#fff",
    },
});
