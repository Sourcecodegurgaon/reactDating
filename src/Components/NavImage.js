import React ,{useState,useEffect}from "react";
import { Text, StyleSheet ,Image ,View} from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
const NavImage = () =>{
  const [Login,setLogin] = useState(false)
 

return(

  <View>
    <Image

    source={require('../../assets/Images/header-logo.png')}
  />

  </View>
)
}

export default NavImage