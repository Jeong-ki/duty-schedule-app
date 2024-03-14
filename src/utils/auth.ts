import EncryptedStorage from 'react-native-encrypted-storage';
import {SaveTokens, SaveUserInfo} from './types';

export async function saveTokens(tokens: SaveTokens): Promise<void> {
  try {
    await EncryptedStorage.setItem('userTokens', JSON.stringify(tokens));
  } catch (error) {
    console.error('Error saving the user info', error);
  }
}

export async function saveUserInfo(userInfo: SaveUserInfo): Promise<void> {
  try {
    await EncryptedStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    console.error('Error saving the user info', error);
  }
}

export async function loadTokens(): Promise<SaveTokens | null> {
  try {
    const tokens = await EncryptedStorage.getItem('userTokens');
    if (tokens) {
      return JSON.parse(tokens);
    }
  } catch (error) {
    console.log('Error loading the tokens', error);
  }
  return null;
}

export async function loadUserInfo(): Promise<SaveUserInfo | null> {
  try {
    const userInfo = await EncryptedStorage.getItem('userInfo');
    if (userInfo) {
      return JSON.parse(userInfo);
    }
  } catch (error) {
    console.log('Error loading the userInfo', error);
  }
  return null;
}

export async function clearStorage() {
  await EncryptedStorage.removeItem('userTokens');
  await EncryptedStorage.removeItem('userInfo');
}
