import EncryptedStorage from 'react-native-encrypted-storage';

export async function saveRefreshToken(refreshToken: string): Promise<void> {
  try {
    await EncryptedStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error saving the user info', error);
  }
}

// export async function saveUserInfo(userInfo: SaveUserInfo): Promise<void> {
//   try {
//     await EncryptedStorage.setItem('userInfo', JSON.stringify(userInfo));
//   } catch (error) {
//     console.error('Error saving the user info', error);
//   }
// }

export async function loadRefreshToken(): Promise<string | null> {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    if (refreshToken) {
      return refreshToken;
    }
  } catch (error) {
    console.log('Error loading the tokens', error);
  }
  return null;
}

// export async function loadUserInfo(): Promise<SaveUserInfo | null> {
//   try {
//     const userInfo = await EncryptedStorage.getItem('userInfo');
//     if (userInfo) {
//       return JSON.parse(userInfo);
//     }
//   } catch (error) {
//     console.log('Error loading the userInfo', error);
//   }
//   return null;
// }

export async function removeRefreshToken() {
  await EncryptedStorage.removeItem('refreshToken');
}
