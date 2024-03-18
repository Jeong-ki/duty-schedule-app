import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useUserStore} from '@/stores/useUserStore';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AppStack from '@/navigation/app-stack';
import LoginStack from '@/navigation/login-stack';
import ErrorBoundary from '@/components/layout/error-boundary';

const queryClient = new QueryClient();

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App(): React.JSX.Element {
  const isLoggedIn = useUserStore(state => !!state.user);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {isLoggedIn ? <AppStack /> : <LoginStack />}
        </NavigationContainer>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
