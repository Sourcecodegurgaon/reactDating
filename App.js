import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/Welcome Screen/HomeScreen";
import Navigationbar  from './src/screens/Navigationbar'
import Searchpostcode from './src/screens/Welcome Screen/Components/Searchpostcode'
import SearchResult  from './src/screens/Welcome Screen/Components/Searchresult'
import UserResult from './src/screens/Welcome Screen/Components/UserResult'
import SignIn from './src/screens/SignIn/SignIn'
import SignUp  from './src/screens/Signup/SignUp'
import Becomeverified from './src/screens/Signup/Becomeverified';
import AccountSetting from "./src/Navigation/Accountsetting";
import Editprofile from "./src/Navigation/Editprofile";
import Moreinfo from "./src/Navigation/Moreinfo";
import FindFriends from "./src/screens/SignIn/FindFriends"
import Forgotpassword from "./src/screens/SignIn/Forgotpassword";
import Optionaldetail from "./src/screens/SignIn/Optionaldetail";
import Tophobbies from "./src/screens/SignIn/Tophobbies"
import Chats  from "./src/screens/Chat/Chats";
import SearchItems from "./src/screens/Chat/SearchItems";
import Tabs from './src/screens/Chat/Tabs';
import UserDetails from './src/screens/Details/UserDetails';
import Personalchat  from './src/screens/Chat/PersonalChat';
import Useroption from './src/Navigation/Useroption';
import Membersscanopen  from './src/screens/Welcome Screen/Components/Memberscanopen'
import HelpImage from './src/Components/HelpImage';
import NavImage  from './src/Components/NavImage'
import React, { useState, useEffect } from "react";


const MyHeader = (navigation) => {
  return {
      header: props => <Navigationbar {...props} />,
      headerStyle: { backgroundColor: '#fff' },
      headerTintColor: '#000',
  };
  }
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Postcode:Searchpostcode,
    WelcomeResult:SearchResult,
    Result: UserResult,
    SignIn:SignIn,
    SignUp:SignUp,
    Verified:Becomeverified,
    AccountSetting:AccountSetting,
    Editprofile:Editprofile,
    Moreinfo:Moreinfo,
    FindFriends:FindFriends,
    Forgotpassword:Forgotpassword,
    Optionaldetail:Optionaldetail,
    Tophobbies:Tophobbies,
    Chats:Chats,
    SearchItems:SearchItems,
    Tabs:Tabs,
    UserDetails:UserDetails,
    Personalchat :Personalchat,
    Useroption:Useroption,
    Membersscanopen:Membersscanopen,
    HelpImage:HelpImage,
    NavImage :NavImage 

  
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => {
      return MyHeader(navigation)
  }
  }

);

export default createAppContainer(navigator);
