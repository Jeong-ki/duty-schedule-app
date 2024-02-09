import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import Home from '@/pages/Home';
import {LoggedInParamList, RootStackParamList} from '@/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from '@/pages/User';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="Home">
          <Tab.Screen name="Home" component={Home} options={{title: '홈'}} />
          <Tab.Screen
            name="User"
            component={User}
            options={{headerShown: false}}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: '로그인'}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: '회원가입'}}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
