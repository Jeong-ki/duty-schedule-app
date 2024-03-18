import React, {useEffect} from 'react';
import {useUserStore} from '@/stores/useUserStore';
import AppStack from '@/navigation/app-stack';
import LoginStack from '@/navigation/login-stack';
import {
  loadRefreshToken,
  removeRefreshToken,
  saveRefreshToken,
} from '@/utils/auth';
import {refreshUser} from '@/api/auth/post-refresh-user';

export default function AppInner() {
  const {user, setUser, logout} = useUserStore();

  useEffect(() => {
    const rememberMe = async () => {
      try {
        const refreshToken = await loadRefreshToken();
        if (!refreshToken) {
          // SplashScreen.hide();
          return;
        }
        const response = await refreshUser(refreshToken);
        const {
          id,
          email,
          username,
          newAccessToken: accessToken,
          newRefreshToken,
        } = response;
        await saveRefreshToken(newRefreshToken);
        setUser({id, email, username, accessToken});
      } catch (error) {
        console.error('Fail RememberMe', error);
        await removeRefreshToken();
        logout();
      } finally {
        // SplashScreen.hide();
      }
    };
    rememberMe();
  }, [logout, setUser]);

  return <>{user ? <AppStack /> : <LoginStack />}</>;
}
