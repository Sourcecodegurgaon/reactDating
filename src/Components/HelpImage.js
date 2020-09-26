import React from "react";
import { Text, StyleSheet, Image, View } from "react-native";



const HelpImage = () => {

    return (
        <View style={styles.mainContainer}>
            <Image style={styles.Image} source={require('../../assets/Images/user.png')} />
            <Image style={styles.Image} source={require('../../assets/Images/question.png')} />

        </View>
    )
}

const styles = StyleSheet.create({

    Image: {
        height: 30,
        width: 30,
        marginRight:8
    },
    mainContainer:{
        flexDirection:"row",
        justifyContent:"space-around",
        flex:1,
        alignItems:"center"
    }
});

export default HelpImage