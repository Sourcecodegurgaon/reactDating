import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TextInput } from "react-native";
import Navigationbar from '../../Navigationbar';
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';
import * as font from 'expo-font';





const FirstRoute = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])


    const [selectedValue, setSelectedValue] = useState("");
    const [contractValue, setcontractValue] = useState("");
    const [considerValue, setconsiderValue] = useState("");
    const [meetValue, setmeetValue] = useState("");
    const [liveValue, setliveValue] = useState("");
    const [funValue, setfunValue] = useState("");
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (

        <View >
            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                <Progress.Bar progress={0.3} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
            </View>
            <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>What do you like to do for fun?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={funValue}
                                style={{ height: 35, width: "100%" }}
                                value={funValue}
                                onValueChange={itemValue => setfunValue(itemValue)}>
                                <Picker.Item label="playdates (parents and children)" value="playdates (parents and children)" />
                                <Picker.Item label="happy hour/cocktails/beers" value="happy hour/cocktails/beers" />
                                <Picker.Item label="sightseeing" value="sightseeing" />
                                <Picker.Item label="artsy stuff (making or looking at)" value="artsy stuff (making or looking at)" />
                                <Picker.Item label="cooking" value="cooking" />
                                <Picker.Item label="dancing" value="dancing" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="yoga" value="yoga" />

                                {/* <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" /> */}
                            </Picker>
                        </View>
                    </View>




                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>How long have you lived here?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={liveValue}
                                style={{ height: 35, width: "100%" }}
                                value={liveValue}
                                onValueChange={itemValue => setliveValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="< 2 years" value="0" />
                                <Picker.Item label="2-5 years" value="1" />
                                <Picker.Item label="> 5 years" value="2" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.mainContainerPicker}>
                    <Text style={styles.labelText}>My friends and I usually talk about</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={liveValue}
                                style={{ height: 35, width: "100%" }}
                                value={liveValue}
                                onValueChange={itemValue => setliveValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="Work" value="Work" />
                                <Picker.Item label="Family" value="Family" />
                                <Picker.Item label="Relationships" value="Relationships" />
                                <Picker.Item label="Gossip" value="Gossip" />
                                <Picker.Item label="Fashion" value="Fashion" />
                                <Picker.Item label="Sports" value="Sports" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>A good friend is someone who..</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={liveValue}
                                style={{ height: 35, width: "100%" }}
                                value={liveValue}
                                onValueChange={itemValue => setliveValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="is always there for me" value="is always there for me" />
                                <Picker.Item label="always sides with me no matter
                what." value="always sides with me no matter
                what." />
                                <Picker.Item label="will be honest with me even if
                it hurts." value="will be honest with me even if
                it hurts." />
                                <Picker.Item label="gives advice" value="gives advice" />
                                <Picker.Item label="Fashion" value="Fashion" />
                                <Picker.Item label="takes my advice." value="takes my advice." />
                                <Picker.Item label="is an activity partner" value="is an activity partner" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>When someone cancels plans we made</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={liveValue}
                                style={{ height: 35, width: "100%" }}
                                value={liveValue}
                                onValueChange={itemValue => setliveValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="My reaction depends on the reason why." value="My reaction depends on the reason why." />
                                <Picker.Item label="I think no big deal" value="I think no big deal" />
                                <Picker.Item label="It really bothers me and I am wary of the friendship." value="It really bothers me and I am wary of the friendship." />
                                <Picker.Item label="I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship." value="I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship." />
                            </Picker>
                        </View>
                    </View>





            {/* <View style={styles.mainContainerPicker}>
                <Text style={styles.labelText}>I am</Text>
                <View style={styles.iAmContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 35, width: "100%" }}
                        value={selectedValue}
                        onValueChange={itemValue => setSelectedValue(itemValue)}
                        label="I am"
                    >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        <Picker.Item label="Gender Diverse" value="Gender Diverse" />
                    </Picker>
                </View>
            </View>


            <View style={styles.mainContainerPicker}>
                <Text style={styles.labelText}>Wanting to be contacted by</Text>
                <View style={styles.iAmContainer}>
                    <Picker
                        selectedValue={contractValue}
                        style={{ height: 35, width: "100%" }}
                        value={contractValue}
                        onValueChange={itemValue => setcontractValue(itemValue)}
                        label="I am">
                        <Picker.Item label="men only" value="0" />
                        <Picker.Item label="women only" value="1" />
                        <Picker.Item label="gender diverse only" value="2" />
                        <Picker.Item label="everyone" value="3" />
                    </Picker>
                </View>
            </View>

            <View style={styles.mainContainerPicker}>
                <Text style={styles.labelText}>I consider myself</Text>
                <View style={styles.iAmContainer}>
                    <Picker
                        selectedValue={considerValue}
                        style={{ height: 35, width: "100%" }}
                        value={considerValue}
                        onValueChange={itemValue => setconsiderValue(itemValue)}
                        label="I am">
                        <Picker.Item label="Outgoing" value="Outgoing" />
                        <Picker.Item label="On the Quieter Side" value="On the Quieter Side" />
                        <Picker.Item label="A Mix of Both" value="A Mix of Both" />
                    </Picker>
                </View>
            </View>

            <View style={styles.mainContainerPicker}>
                <Text style={styles.labelText}>I want to meet</Text>
                <View style={styles.iAmContainer}>
                    <Picker
                        selectedValue={meetValue}
                        style={{ height: 35, width: "100%" }}
                        value={meetValue}
                        onValueChange={itemValue => setmeetValue(itemValue)}
                        label="I am">
                        <Picker.Item label="a few goods friends" value="1" />
                        <Picker.Item label="a lot of accquaintances" value="2" />
                        <Picker.Item label="no preference" value="3" />
                    </Picker>
                </View>
            </View>
 */}

            <Button containerStyle={{ marginHorizontal: 20, marginVertical: 20 }}
                onPress={() => SecondRoute}
                title="Continue"
                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

            />

        </View>

    )
};

const SecondRoute = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [contractValue, setcontractValue] = useState("");
    const [considerValue, setconsiderValue] = useState("");
    const [meetValue, setmeetValue] = useState("");
    const [date, setDate] = useState(new Date())
    const [liveValue, setliveValue] = useState("");
    const [activityValue, setactivityValue] = useState("");

    return (
        <SafeAreaView >
            <ScrollView>
                <View>
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>

               

                    


                 




              

               

                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Are you in a realtionship?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 35, width: "100%" }}
                                value={selectedValue}
                                onValueChange={itemValue => setSelectedValue(itemValue)}
                                label="I am">
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Gender Diverse" value="Gender Diverse" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Do you have kids?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 35, width: "100%" }}
                                value={selectedValue}
                                onValueChange={itemValue => setSelectedValue(itemValue)}
                                label="I am">
                                <Picker.Item label="Yes" value="Yes" />
                                <Picker.Item label="No" value="No" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Do you have pets?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 35, width: "100%" }}
                                value={selectedValue}
                                onValueChange={itemValue => setSelectedValue(itemValue)}
                                label="I am">
                                <Picker.Item label="Dog" value="Dog" />
                                <Picker.Item label="Cat" value="Cat" />
                                <Picker.Item label="Rabbit" value="Rabbit" />
                                <Picker.Item label="Birds" value="Birds" />
                                <Picker.Item label="Fish" value="Fish" />
                                <Picker.Item label="Reptile" value="Reptile" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>I spend my days..</Text>
                        <TextInput

                            maxLength={100}
                            style={styles.textArea}
                        />
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>I also speak</Text>
                        <Input
                            style={styles.inputText}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                        />
                    </View>






                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #F64225", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
};



const ThirdRoute = () => {

    const [smokeValue, setsmokeValue] = useState("");
    const [ alcoholValue, setalcoholValue] = useState("");
   

    return (
        <ScrollView>
        <SafeAreaView>
        <View >
        <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={400} borderColor="white" height={20} borderRadius={10} />
                    </View>
                <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Do you smoke?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={smokeValue}
                                style={{ height: 35, width: "100%" }}
                                value={smokeValue}
                                onValueChange={itemValue => setsmokeValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="Never" value="Never" />
                                <Picker.Item label="Socially" value="Socially" />
                                <Picker.Item label="Yes" value="Yes" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>How about drinking alcohol?</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={alcoholValue}
                                style={{ height: 35, width: "100%" }}
                                value={alcoholValue}
                                onValueChange={itemValue => setalcoholValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="Never" value="Never" />
                                <Picker.Item label="Socially" value="Socially" />
                                <Picker.Item label="Weekends Only" value="Weekends Only" />

                                <Picker.Item label="Couple Times a Week" value="Couple Times a Week" />

                                <Picker.Item label="Every Day" value="Every Dayy" />
                            </Picker>
                        </View>
                    </View>



                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Favorite Books</Text>
                        <TextInput
                            maxLength={100}
                            style={styles.textArea}
                        />
                    </View>





                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Favorite Movies</Text>
                        <TextInput

                            maxLength={100}
                            style={styles.textArea}
                        />
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Favorite TV Shows</Text>
                        <TextInput

                            maxLength={100}
                            style={styles.textArea}
                        />
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Favorite Music</Text>
                        <TextInput

                            maxLength={100}
                            style={styles.textArea}
                        />
                    </View>


                    <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                    title="Continue"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                />
            </View>

            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 15, marginVertical: 15, height: 100, fontFamily: "roboto-bold" }}
                    buttonStyle={{ height: 50, fontFamily: "roboto-bold" }}
                    buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                    title="Previous"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                />
            </View>


        </View>
        </SafeAreaView>
        </ScrollView>
    )
}
const FourthRoute = props => {


    const [liveValue, setliveValue] = useState("");
    const [activityValue, setactivityValue] = useState("");


    return (
        <ScrollView>
            <SafeAreaView>
                <View >
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={1} unfilledColor="white" color="#027BFF" animationType="spring" width={432} borderColor="white" height={20} borderRadius={10} />
                    </View>



                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Anything else you want to share?</Text>
                        <TextInput

                            maxLength={100}
                            style={styles.textArea}
                        />
                    </View>


                    <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                    title="Continue"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                />
            </View>


                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #F64225", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        />
                    </View>

                </View>

            </SafeAreaView>
        </ScrollView>
    )



}








//Export Upper Content

const Optionaldetail = props => {
    useEffect(() => {

            font.loadAsync({
                'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
            });
    
    }, [])
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', },
        { key: 'second', },
        {key :'Third'},
        { key: 'Four' },

    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        Four: FourthRoute,
        Third:ThirdRoute
    });

    return (
        <View style={{ flex: 1 }}>
            <Navigationbar />
            <TabView

                style={{ backgroundColor: "white" }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                indicatorStyle={{ backgroundColor: 'transparent', height: 5.5 }}



            />
        </View>
    );

}
const styles = StyleSheet.create({
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat-ExtraLight',
        fontSize: 16
    },
    mainContainerPicker:
    {
        marginVertical: 8
    },
    overflowContainer:
    {
        justifyContent: "center",
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 80,
        overflow: "hidden"

    },
    overflowContainerText:
    {
        marginHorizontal: 5,
        textAlign: "justify",
        marginVertical: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    lowerTextfield: {
        marginTop: -23,
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-ExtraLight'

    },
    textArea:
    {
        borderWidth: 1,
        height: 100,
        marginHorizontal: 10,

    },
    inputText: {
        borderWidth: 1, paddingHorizontal: 8, marginTop: 4
    },
    TextInputStyleClass:{
        height: 50,
        borderWidth: 1,
        backgroundColor : "#FFFFFF",
        height: 150,marginHorizontal:10,
         
        }
    

});




export default Optionaldetail