import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchField  from './SerachField'
import Chats from './Chats'
import { Ionicons } from '@expo/vector-icons';
import SearchItems from './SearchItems'

function HomeScreen() {
  return (
   <Chats />
  );
}

function SettingsScreen() {
  return (
    <SearchField />
  );
}

function Favorate() {
    return (
   
      <SearchItems />
  
    );
  }



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
          } else if (route.name === 'Favorate') {
            iconName = focused ? 'ios-star' : 'ios-star';
          }
          else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
          
      <Tab.Screen name="Chat" component={HomeScreen} />
      <Tab.Screen name="Favorate" component={Favorate} />
      <Tab.Screen name="Search" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const  Tabs = () => {
  return (
    <NavigationContainer>
    <MyTabs />
  </NavigationContainer>

  );
}


export default  Tabs