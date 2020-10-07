import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/Welcome Screen/HomeScreen";
import Navigationbar  from './src/Navigationbar'
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
import SearchField  from "./src/screens/Chat/SerachField"
import Tabs from './src/screens/Chat/Tabs';
import UserDetail from './src/screens/Details/UserDetails';
import Personalchat  from './src/screens/Chat/PersonalChat';
import Useroption from './src/Navigation/Useroption';
import HelpImage  from './src/Components/HelpImage';
import Membersscanopen  from './src/screens/Welcome Screen/Components/Memberscanopen'
const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Nav :Navigationbar,
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
    SearchField:SearchField,
    Tabs:Tabs,
    UserDetail:UserDetail,
    Personalchat :Personalchat,
    Useroption:Useroption,
    HelpImage:HelpImage,
    Membersscanopen:Membersscanopen 
  },
  {
    initialRouteName: "Home",
   
    defaultNavigationOptions: {
      headerShown: false
    },
  }

);

export default createAppContainer(navigator);
