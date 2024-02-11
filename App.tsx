import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '@/pages/Home';
import {LoggedInParamList, RootStackParamList} from '@/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import User from '@/pages/User';
import SignIn from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import {useUserStore} from '@/stores/useUserStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const Tab = createBottomTabNavigator<LoggedInParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App(): React.JSX.Element {
  const user = useUserStore(state => state.user);
  console.log('user: ', user);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {user ? (
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
    </QueryClientProvider>
  );
}

export default App;
