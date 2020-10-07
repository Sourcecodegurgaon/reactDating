import React, {useState} from "react";
import { Text, StyleSheet ,View} from "react-native";
import { Header } from 'react-native-elements';
import NavImage  from './Components/NavImage'
import HelpImage from './Components/HelpImage'
import { Button, Overlay } from 'react-native-elements';

const Navigationbar = () => {
  const [visible, setVisible] = useState(true);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
    return(
      <View style={{borderBottomWidth:1}}>
        <Header
        containerStyle={{backgroundColor:"white", height:100,borderBottomWidth:1,zIndex:2}}
        placement="left"
        leftComponent={<NavImage />}
        rightComponent={<HelpImage />}
      />


      </View>


    )
}

export default Navigationbar