import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/Welcome Screen/HomeScreen";
import Navigationbar  from './src/Navigationbar'
import Searchpostcode from './src/screens/Welcome Screen/Components/Searchpostcode'
import SearchResult  from './src/screens/Welcome Screen/Components/Searchresult'
import UserResult from './src/screens/Welcome Screen/Components//UserList'
import SignIn from './src/screens/SignIn/SignIn'
import SignUp  from './src/screens/Signup/SignUp'
import Becomeverified from './src/screens/Signup/Becomeverified'
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
  },
  {
    initialRouteName: "Home",
   
    defaultNavigationOptions: {
      headerShown: false
    },
  }
);

export default createAppContainer(navigator);
